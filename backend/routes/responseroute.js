const express = require("express");
const router = express.Router();

const {
  addResponse,
  getTokenResponses
} = require("../controllers/responsecontroller");

router.post("/", addResponse);
router.get("/:tokenId", getTokenResponses);

module.exports = router;