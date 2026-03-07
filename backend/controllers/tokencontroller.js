const Token = require("../models/token");

async function createToken(req, res) {
  try {
    const { userName, userEmail, shopId, serviceId } = req.body;

    if (!userName || !userEmail || !shopId || !serviceId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const lastToken = await Token.findOne({
      shop: shopId,
      serviceId: serviceId
    }).sort({ tokenNumber: -1 });

    let newTokenNumber = 1;

    if (lastToken && lastToken.tokenNumber) {
      newTokenNumber = lastToken.tokenNumber + 1;
    }

    const token = await Token.create({
      userName,
      userEmail,
      shop: shopId,
      serviceId,
      tokenNumber: newTokenNumber
    });

    res.status(201).json(token);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getShopTokens(req, res) {
  try {
    const tokens = await Token.find({ shop: req.shop._id }).sort({
      createdAt: -1,
    });

    res.json(tokens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateTokenStatus(req, res) {
  try {
    const { status } = req.body;

    const token = await Token.findById(req.params.id);

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    token.status = status;
    await token.save();

    res.json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTokensByService(req, res) {
  try {
    const { shopId, serviceId } = req.query;

    const tokens = await Token.find({
      shop: shopId,
      serviceId: serviceId
    }).sort({ tokenNumber: 1 });

    res.json(tokens);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getWaitingTokens(req, res) {
  try {
    const { shopId, serviceId } = req.query;

    const tokens = await Token.find({
      shop: shopId,
      serviceId: serviceId,
      status: "waiting"
    }).sort({ tokenNumber: 1 });

    res.json(tokens);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function callNextToken(req, res) {
  try {
    const { shopId, serviceId } = req.body;

    const nextToken = await Token.findOne({
      shop: shopId,
      serviceId: serviceId,
      status: "waiting"
    }).sort({ tokenNumber: 1 });

    if (!nextToken) {
      return res.json({ message: "No waiting tokens" });
    }

    nextToken.status = "serving";
    await nextToken.save();

    res.json(nextToken);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = { createToken, getShopTokens, updateTokenStatus ,getTokensByService, getWaitingTokens, callNextToken };
