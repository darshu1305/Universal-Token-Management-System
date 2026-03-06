const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
      
      token = req.headers.authorization.split(" ")[1];
console.log("Authorization Header:", req.headers.authorization);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.shop = await Shop.findById(decoded.id).select("-password");

      next();
    } else {
      res.status(401).json({ message: "Not authorized" });
    }

  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

module.exports = protect;