const mongoose = require("mongoose");
const clientDAO = require("../daos/clients");

async function createClient(clientData, user_id) {
  const objectId = new mongoose.Types.ObjectId(user_id);
  const combinedData = { ...clientData, user_id: objectId };
  console.log(`received ${combinedData}`);
  const client = clientDAO.createClient(combinedData);
  return client;
}

async function updateClient(clientData, user_id) {
  const userObjectId = new mongoose.Types.ObjectId(user_id);
  const { _id, ...remainingData } = clientData;
  const clientObjectId = new mongoose.Types.ObjectId(_id);
  const cleanedData = { ...remainingData, user_id: userObjectId };
  const client = await clientDAO.updateClient(clientObjectId, cleanedData);

  return client;
}

async function deleteClient(client_id) {
  const clientObjectId = new mongoose.Types.ObjectId(client_id);
  const deletedClient = await clientDAO.deleteClient(clientObjectId);

  return deletedClient;
}

module.exports = {
  createClient,
  updateClient,
  deleteClient,
};
