const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authneticate = async (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

      req.user = await User.findById(decodedToken.id).select("-password");
      
      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { authneticate };
