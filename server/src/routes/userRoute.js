const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const router = express.Router();
const { authneticate } = require("../middlewares/authMiddleware");
//routes goes here
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authneticate, getUser);

module.exports = router;
