var express = require("express");
var router = express.Router();
var itemController = require("../controllers/items");
var security = require("../middlewares/security");

// get items by SKU_ID,
// returns whole item object
router.get("/:skuId", itemController.getItemBySkuId);

router.get("/", security.checkJWT, itemController.getItems);

module.exports = router;
