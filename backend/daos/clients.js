const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const Client = mongoose.model("Client", clientSchema);

function getClients() {
  return Client.find({});
}

module.exports = {
  getClients,
};
