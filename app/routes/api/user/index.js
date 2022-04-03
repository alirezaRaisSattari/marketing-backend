const express = require("express");
const router = express.Router();

const ShareLinkMarketerController = require("../../../controllers/user/ShareLinkController");

router.get('/shareLink/:uniqueCode' , ShareLinkMarketerController.shareLinkCompaign)

module.exports = router;
