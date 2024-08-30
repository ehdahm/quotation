var express = require("express");
var router = express.Router();
var authController = require("../controllers/auth");
var security = require("../middlewares/security");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/", authController.fetchSaltAndIterations);

router.post("/logout", security.checkJWT, authController.logout);

module.exports = router;
