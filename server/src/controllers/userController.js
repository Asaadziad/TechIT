const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

//@DESC register new user
//@ROUTE POST /api/users/register/
//@ACCESS Public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill the required fields" });
  }
  try {
    //check if user already exists by email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = await User.create({
      name: username,
      email: email,
      password: hashedPassword,
      isAdmin: false,
    });

    //Create use cart
    const newCart = await Cart.create({
      products: [],
      userId: newUser._id,
      isActive: true,
    });
    newUser.activeCart = newCart;
    await newUser.save();
    //check if user and cart created
    if (newUser && newCart) {
      return res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        token: generateToken(newUser._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log(err);
  }
};

//@DESC login existing user
//@ROUTE POST /api/users/login
//@ACCESS Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //if user exists and password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      username: user.name,
      email: user.email,
      password: password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

//@DESC register new user
//@ROUTE GET /api/users/me
//@ACCESS Private
const getUser = async (req, res) => {
  const { _id, name, email, activeCart } = await User.findById(req.user.id);
  res
    .status(200)
    .json({ id: _id, name: name, email: email, activeCart: activeCart });
};

//Generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: "7d" });
};
module.exports = { registerUser, loginUser, getUser };
