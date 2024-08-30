const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  user_id: { type: mongoose.ObjectId, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const Client = mongoose.model("Client", clientSchema);

function getClients(user_id) {
  const objectId = new mongoose.Types.ObjectId(user_id);
  return Client.find({ user_id: objectId });
}

function createClient(clientData) {
  console.log(JSON.stringify(clientData));
  return Client.create(clientData);
}

module.exports = {
  getClients,
  createClient,
};
