const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    iterations: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
    expiry: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

async function find(credentials) {
  try {
    const user = await User.findOne({ email: credentials.email }).lean();
    console.log(
      "User found in DAO:",
      user ? JSON.stringify(user, null, 2) : "No user found"
    );
    return user;
  } catch (error) {
    console.error("Error in find:", error);
    throw error;
  }
}

async function updateOne(filter, update) {
  try {
    const result = await User.updateOne(filter, update);
    console.log("Update operation result:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("Error in updateOne:", error);
    throw error;
  }
}

async function findOne(filter) {
  try {
    const result = await User.findOne(filter);
    console.log("Update operation result:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("Error in updateOne:", error);
    throw error;
  }
}

async function create(userData) {
  try {
    const result = await User.create(userData);
    console.log("Update operation result:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("Error in creating:", error);
    throw error;
  }
}

async function removeToken(user_id) {
  try {
    console.log(`userid received in dao: ${user_id}`);
    const result = await User.findByIdAndUpdate(user_id, {
      $unset: { token: "", tokenExpiry: "" },
    });
    return result;
  } catch (error) {
    console.error("Error removing token:", error);
    throw error;
  }
}

module.exports = {
  find,
  findOne,
  updateOne,
  create,
  removeToken,
};
