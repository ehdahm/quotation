const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSessionsSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
    },
    expire_at: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Compile the schema into a model and export it
module.exports = mongoose.model("UserSessions", userSessionsSchema);
