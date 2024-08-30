const mongoose = require("mongoose");
const clientDAO = require("../daos/clients");

async function createClient(clientData, user_id) {
  const objectId = new mongoose.Types.ObjectId(user_id);
  const combinedData = { ...clientData, user_id: objectId };
  console.log(`received ${combinedData}`);
  const client = clientDAO.createClient(combinedData);
  return client;
}

module.exports = {
  createClient,
};
