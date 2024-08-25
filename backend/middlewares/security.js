const utilSecurity = require("../utils/security")
const DaoUsers = require('../daos/users');
const userSessions = require("../daos/userSessions");

module.exports = {
    checkJWT,
    checkLogin,
    checkPermission
};

async function checkJWT(req, res, next) {
    // Check for the token being sent in a header or as a query parameter
    let token = req.get("Authorization") || req.query.token;
    console.log('security.js token', token)
    if (token) {
      token = token.replace("Bearer ", "");
      console.log('token after replacing', token)
      const tokenUser = await userSessions.findOne({"token": token})
      console.log('tokenUser', tokenUser)
        if (tokenUser == null || Object.keys(tokenUser).length == 0) {
          console.log("no token found!")
            req.user_id = null;
            return next();
        }
        console.log('token before verifyJWT', token)
        req.user_id = JSON.stringify(utilSecurity.verifyJWT(token))
        console.log(req.user_id)
    } else {
      // No token was sent
      req.user_id = null;
    }
    return next();
  };
  

// check if they are login
function checkLogin(req, res, next) {
    // Status code of 401 is Unauthorized
    if (!req.user_id) return res.status(401).json("Unauthorized");
    // A okay
    next();
  };

// check if they are owner or if they are admin
function checkPermission(req, res, next) {
    // Status code of 401 is Unauthorized
    if (!req.user_id) return res.status(401).json("Unauthorized");
    // if you are not the owner and you are not admin -> unauthorized
    if (req.body.username != req.user.username) return res.status(401).json("Unauthorized"); 
    next();
  };
