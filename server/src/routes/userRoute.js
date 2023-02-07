const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//routes goes here
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", userController.getUser);

module.exports = router;
