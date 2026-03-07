const express = require("express");
const router = express.Router();

const {
  registerShop,
  loginShop,
  addService
} = require("../controllers/shopcontroller");


router.post("/register", registerShop);
router.post("/login", loginShop);
router.post("/add-service", addService);

module.exports = router;