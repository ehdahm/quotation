const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const Client = mongoose.model("Client", clientSchema);

function getClients(user_id) {
  const objectId = new mongoose.Types.ObjectId(user_id);
  return Client.find({ user_id: objectId });
}

module.exports = {
  getClients,
};
