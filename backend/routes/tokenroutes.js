const express = require("express");
const router = express.Router();

const {
  createToken,
  getShopTokens,
  updateTokenStatus,
  getTokensByService,
  getWaitingTokens,
  callNextToken
} = require("../controllers/tokencontroller");

const protect = require("../middleware/authMiddleware");
router.post("/", createToken);
router.get("/by-service", getTokensByService);
router.get("/", getShopTokens);
router.put("/:id", updateTokenStatus);
router.get("/by-service", getTokensByService);
router.get("/waiting", getWaitingTokens);
router.post("/call-next", callNextToken);
module.exports = router;