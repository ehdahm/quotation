const jwt = require("jsonwebtoken");
const userDAO = require("../daos/users");

module.exports = {
  createJWT,
  getExpiry,
  verifyJWT,
  checkJWT,
  checkLogin,
  checkPermission,
};

function createJWT(payload) {
  return jwt.sign({ payload }, process.env.SECRET, { expiresIn: "24h" });
}

function getExpiry(token) {
  const payloadBase64 = token.split(".")[1];
  const decodedJson = Buffer.from(payloadBase64, "base64").toString();
  const decoded = JSON.parse(decodedJson);
  return decoded.exp;
}

function verifyJWT(token) {
  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT verification error", err);
      return null;
    }
    console.log("Decoded token", decoded);
    return decoded;
  });
}

async function checkJWT(req, res, next) {
  let token = req.get("Authorization") || req.query.token;
  if (token) {
    token = token.replace("Bearer ", "");
    const tokenUser = await userDAO.findOne({ token });
    if (!tokenUser) {
      req.user = null;
      return next();
    }
    const decodedUser = verifyJWT(token);
    req.user = decodedUser ? decodedUser.payload : null;
  } else {
    req.user = null;
  }
  next();
}

function checkLogin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}

function checkPermission(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.body.email !== req.user.email)
    return res.status(401).json({ message: "Unauthorized" });
  next();
}
