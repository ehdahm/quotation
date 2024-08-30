const mongoose = require("mongoose");
const quotationDAO = require("../daos/quotations");
const quotationItemsDAO = require("../daos/quotationItems");

async function createQuotation(quotation, quotationItems) {
  try {
    // create the quotation object
    // quotation should be an object
    quotation.client_id = new mongoose.Types.ObjectId(quotation.client_id);
    const daoQuotation = await quotationDAO.createQuotation(quotation);
    console.log("daoQuotation", daoQuotation);
    console.log("quotationItems", quotationItems);

    // quotationItems is an array of objects
    const newQuotationItems = quotationItems.map((item) => ({
      ...item,
      scope_id: new mongoose.Types.ObjectId(item.scope_id),
      room_id: new mongoose.Types.ObjectId(item.room_id),
      quotation_id: daoQuotation._id,
    }));
    console.log("newQuotationItems", newQuotationItems);

    const createdQuotationItems =
      await quotationItemsDAO.insertManyQuotationItems(newQuotationItems);
    console.log("createdQuotationItems", createdQuotationItems);

    const createdQuotation = {
      quotation: daoQuotation,
      quotationItems: createdQuotationItems,
    };

    return createdQuotation;
  } catch (error) {
    console.error("Error in creating quotation:", error);
    throw error;
  }
}

async function getQuotation(quotationId) {
  try {
    const daoQuotation = await quotationDAO.getQuotation(quotationId);
    const daoQuotationItems =
      await quotationItemsDAO.getQuotationItemsByQuotationId(quotationId);

    if (!daoQuotation) {
      throw new Error("Quotation not found");
    }

    const data = {
      quotation: daoQuotation,
      quotationItems: daoQuotationItems,
    };
    return data;
  } catch (error) {
    console.error("Error in retrieving quotation:", error);
    throw error;
  }
}

async function updateQuotation(quotation, quotationItems, quotation_id) {
  try {
    // Update the quotation data
    const updatedQuotation = await quotationDAO.updateQuotation(
      quotation_id,
      quotation
    );

    // Get existing items for this quotation
    const existingItems =
      await quotationItemsDAO.getQuotationItemsByQuotationId(quotation_id);
    const existingItemIds = existingItems.map((item) => item._id.toString());

    const updatedItems = [];
    const newItems = [];

    // Process items
    for (const item of quotationItems) {
      if (item._id && existingItemIds.includes(item._id.toString())) {
        // Update existing item
        const updatedItem = await quotationItemsDAO.updateQuotationItems(
          item._id,
          item
        );
        updatedItems.push(updatedItem);
        // Remove from existingItemIds
        existingItemIds.splice(existingItemIds.indexOf(item._id.toString()), 1);
      } else {
        // Prepare new item for creation
        newItems.push({
          ...item,
          quotation_id: new mongoose.Types.ObjectId(quotation_id),
          scope_id: new mongoose.Types.ObjectId(item.scope_id),
          room_id: new mongoose.Types.ObjectId(item.room_id),
        });
      }
    }

    // Create new items
    const createdItems = await quotationItemsDAO.insertManyQuotationItems(
      newItems
    );
    console.log("createdItems", createdItems);

    // Delete items that are no longer present
    if (existingItemIds.length > 0) {
      await quotationItemsDAO.deleteMany({
        quotation_id: quotation_id,
        _id: {
          $in: existingItemIds.map((id) => new mongoose.Types.ObjectId(id)),
        },
      });
    }

    // Fetch all current items for this quotation
    const allCurrentItems =
      await quotationItemsDAO.getQuotationItemsByQuotationId(quotation_id);

    return {
      quotation: updatedQuotation,
      quotationItems: allCurrentItems,
    };
  } catch (error) {
    console.error("Error in updating quotation:", error);
    throw error;
  }
}

async function getQuotationsByClientId(clientId) {
  try {
    const quotations = await quotationDAO.findByClientId(clientId);
    return quotations;
  } catch (error) {
    console.error("Error in QuotationService.getQuotationsByClientId:", error);
    throw error;
  }
}

module.exports = {
  createQuotation,
  getQuotation,
  updateQuotation,
};

module.exports = {
  createQuotation,
  getQuotation,
  updateQuotation,
  getQuotationsByClientId,
};
