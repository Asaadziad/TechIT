const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const getCart = async (req, res) => {
  
  return res.status(200).json({ myProducts: req.user.activeCart.products });
};
const addProductToCart = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  const user = await User.findById(req.user._id);
  if (product) {
    user.activeCart.products.push(product);
    await user.save();
    return res
      .status(200)
      .json({ message: "Product added to cart successfully" });
  } else {
    return res.status(400).json({ message: "Product doesnt exist" });
  }
};
const purchaseCart = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.activeCart.isAcitve = false;
  user.purchasedCarts.push({
    ...user.activeCart,
    products: [...user.activeCart.products],
  });
  const newCart = await Cart.create({
    products: [],
    userId: user._id,
    isAcitve: true,
  });
  user.activeCart = newCart;
  await user.save();
  return res.status(200).json({ message: "Cart purchased successfully" });
};
const getAllPreviousCarts = async (req, res) => {
  const user = await User.findById(req.user.id);
  return res
    .status(200)
    .json({ message: "success", previousCarts: user.purchasedCarts });
};

module.exports = {
  getCart,
  purchaseCart,
  getAllPreviousCarts,
  addProductToCart,
};
