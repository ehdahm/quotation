const quotationDAO = require("../daos/quotations");
const quotationItemsDAO = require("../daos/quotationItems");

async function createQuotation(quotation, quotationItems) {
  try {
    // create the quotation object
    // quotation should be an object
    const daoQuotation = await quotationDAO.createQuotation(quotation);
    console.log("daoQuotation", daoQuotation);

    // quotationItems is an array of objects
    const newQuotationItems = quotationItems.map((item) => ({
      ...item,
      quotation_id: daoQuotation._id,
    }));

    const createdQuotationItems =
      await quotationItemsDAO.insertManyQuotationItems(newQuotationItems);

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
    const daoQuotationItems = await quotationItemsDAO.getQuotationItemsById(
      quotationId
    );

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

module.exports = {
  createQuotation,
  getQuotation,
};
