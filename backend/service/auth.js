const userDao = require("../daos/users");
const securityUtil = require("../utils/security");

async function login(credentials) {
  console.log(`passing to dao credentials: ${credentials}`);
  const user = await userDao.find(credentials);

  console.log(`receiving user from dao: ${user}`);

  if (user == null || Object.keys(user).length == 0) {
    // If User does not exist
    return { success: false, error: "Invalid username/password" };
  }

  const token = await createSession(user);
  console.log(`received token for user: ${token}`);
  const userData = { ...user, token };
  console.log(`returning userData in service: ${userData}`);
  return userData;
}

async function register(userData) {
  const createdUser = await userDao.create(userData);
  return createdUser;
}

async function fetchSaltAndIterations(email) {
  const userData = await userDao.findOne({ email });
  return userData;
}

async function createSession(user) {
  // Use user_id in payload for jwt
  console.log(
    `passing details to createSession: ${user}, ${(user._id, user.email)}`
  );

  const jwtPayload = {
    user_id: user._id,
    email: user.email,
  };
  console.log(`jwtPayload ${jwtPayload}`);

  const token = securityUtil.createJWT(jwtPayload); // Returns a string, after signing
  console.log(`token from jwt ${token}`);

  const expiry = securityUtil.getExpiry(token);
  console.log(`expiry ${expiry}`);

  const updateResult = await userDao.updateOne(
    { _id: user._id },
    {
      $set: {
        token: token,
        expiry: expiry,
      },
    }
  );
  console.log(`Update result:`, updateResult);
  if (updateResult.modifiedCount === 0) {
    console.warn(`User document was not updated. User ID: ${user._id}`);
  }

  console.log(`returning token from service ${token}`);
  return token;
}

module.exports = {
  login,
  register,
  fetchSaltAndIterations,
};
