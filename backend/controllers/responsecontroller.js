const Response = require("../models/response");
const Token = require("../models/token");

async function addResponse(req, res) {
  try {
    const { tokenId, message, status } = req.body;

    if (!tokenId || !message) {
      return res.status(400).json({ message: "tokenId and message required" });
    }

    const existingToken = await Token.findById(tokenId);

    if (!existingToken) {
      return res.status(404).json({ message: "Token not found" });
    }

    const response = await Response.create({
      token: tokenId,
      message,
      status: status || "info"
    });

    res.status(201).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getTokenResponses(req, res) {
  try {
    const responses = await Response.find({
      token: req.params.tokenId
    }).sort({ createdAt: -1 });

    res.json(responses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addResponse, getTokenResponses };