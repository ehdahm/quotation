var express = require("express");
var router = express.Router();

// get items by SKU_ID,
// returns whole item object
router.get("/:skuId", itemController.getItemBySkuId);

module.exports = router;
