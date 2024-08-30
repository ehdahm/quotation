const clientDao = require("../daos/clients");
const clientService = require("../service/clients");

async function getClients(req, res) {
  try {
    // destructure userid from the request set by middleware
    const { user_id } = req.user;
    console.log("clientsService user_id", user_id);
    const clients = await clientDao.getClients(user_id);
    if (!clients) {
      return res.status(404).json({ message: "No clients found" });
    }
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function createClient(req, res) {
  try {
    const { user_id } = req.user;
    const clientData = req.body;
    console.log(`received clientData in controller: ${clientData}`);
    const client = await clientService.createClient(clientData, user_id);
    console.log("created client: ", client);
    if (!client) {
      return res.status(404).json({ message: "Client creation failed" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  getClients,
  createClient,
};
