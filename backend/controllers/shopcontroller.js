const Shop = require("../models/Shop");
const generateToken = require("../utils/generateToken");

async function registerShop(req, res) {
  try {
    const { name, email, password, location, category } = req.body;
    const shopExists = await Shop.findOne({ email });
    if (shopExists) {
      return res.status(400).json({ message: "Shop already exists" });
    }

    const shop = await Shop.create({
      name,
      email,
      password,
      location,
      category
    });

    res.status(201).json({
      _id: shop._id,
      name: shop.name,
      email: shop.email,
      token: generateToken(shop._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function loginShop(req, res) {
  try {
    const { email, password } = req.body;

    const shop = await Shop.findOne({ email });
    if (!shop) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await shop.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: shop._id,
      name: shop.name,
      email: shop.email,
      token: generateToken(shop._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function addService(req, res) {
  try {
    const { shopId, name, priority } = req.body;

    if (!shopId || !name || !priority) {
      return res.status(400).json({ message: "shopId, name and priority required" });
    }

    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    shop.services.push({ name, priority });

    await shop.save();

    res.status(201).json({
      message: "Service added successfully",
      services: shop.services
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registerShop, loginShop, addService };