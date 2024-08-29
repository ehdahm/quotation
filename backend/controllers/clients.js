const clientDao = require("../daos/clients");

async function getClients(req, res) {
  try {
    const clients = await clientDao.getClients();
    if (!clients) {
      return res.status(404).json({ message: "No clients found" });
    }
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  getClients,
};
