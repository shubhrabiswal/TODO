const jwt = require("jsonwebtoken");
const env = require('dotenv')
env.config();

exports.requireLogin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
  //jwt.decode()
};