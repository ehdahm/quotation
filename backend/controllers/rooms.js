const roomDAO = require("../daos/rooms");

async function getRooms(req, res) {
  try {
    const rooms = await roomDAO.findAllRooms();
    if (!rooms) {
      return res.status(404).json({ message: "No rooms found" });
    }
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  getRooms,
};
