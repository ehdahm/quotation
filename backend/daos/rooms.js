const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Room = mongoose.model("Room", roomSchema);

function createRoom(name) {
  return Room.create({ name });
}

function findAllRooms() {
  return Room.find({});
}

module.exports = {
  createRoom,
  findAllRooms,
};
