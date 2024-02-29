const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

exports.authUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.query.token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};
