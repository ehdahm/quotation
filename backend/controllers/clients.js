const clientDao = require("../daos/clients");

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

module.exports = {
  getClients,
};
