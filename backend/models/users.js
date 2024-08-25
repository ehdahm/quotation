const { token } = require("morgan");
const UserDao = require("../daos/users");
const UserSessionsDao = require('../daos/userSessions')
const utilSecurity = require("../utils/security");

module.exports = {
  signup,
  getSaltAndIterations,
  loginUser,
  logoutUser,
  getUsername,
};

async function signup(body) {
  const user = await UserDao.findOne({ username: body.username });
  console.log(user);
  if (user) {
    return { success: false, error: "user already exists" };
  }
  const newUser = await UserDao.create(body);
  console.log('newUser signup', newUser)
  const token = await createUserSession(newUser)
  console.log('signup token', token)
  return { success: true, data: token };
}

async function getSaltAndIterations(body) {
  const loginDetailsSchema = {
    "username": 1,
    "salt": 1,
    "iterations": 1,
  };
  console.log(body.username);
  const user = await UserDao.findOne(
    { username: body.username },
    loginDetailsSchema
  );
  console.log(user);
  return { success: true, data: user };
}

async function loginUser(body) {
  // Check the request body for required properties
  if (!body.hasOwnProperty("username")) {
    return { success: false, error: "missing username" };
  }
  if (!body.hasOwnProperty("password")) {
    return { success: false, error: "missing password" };
  }

  // When all properties are present, search Users table for matching values
  const user = await UserDao.findOne({
    username: body.username,
    password: body.password,
  });
  if (user == null || Object.keys(user).length == 0) { // If User does not exist
    return { success: false, error: "Invalid username/password" };
  }

  const token = await createUserSession(user)

  return { success: true, data: token };
}

async function logoutUser(body) {
  if (!body.hasOwnProperty('user_id')) {
    return {success: false, error: "missing user_id"};
  }
  console.log('body.user_id',body.user_id)
  await UserSessionsDao.deleteOne({"user_id": body.user_id});
  const userData = await UserDao.findOne({"_id": body.user_id})
  return { success: true, data: userData.username}
}

// uses userId to create a new login session taking user payload
async function createUserSession(user) {
  // Use user_id in payload for jwt
  const jwtPayload = {
    user_id: user._id,
    username: user.username
  };
  const token = utilSecurity.createJWT(jwtPayload); // Returns a string, after signing
  const expiry = utilSecurity.getExpiry(token);

  // Create new user session
  await UserSessionsDao.create(
    { user_id: user._id, token: token, expire_at: expiry },
  );
  return token
}

async function getUsername(user_id) {
  console.log('user_id is this', user_id)
  const user = await UserDao.findOne({ "_id": user_id });
  return user ? user.username : null;
}