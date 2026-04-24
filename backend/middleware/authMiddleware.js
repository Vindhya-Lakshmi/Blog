const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  console.log("AUTH HEADER:", authHeader); // debug

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    // ✅ extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    console.log("TOKEN EXTRACTED:", token); // debug

    const verified = jwt.verify(token, "secretkey");

    req.user = verified;
    next();
  } catch (err) {
    console.log("TOKEN ERROR:", err.message);
    res.status(400).json({ message: "Invalid Token" });
  }
};