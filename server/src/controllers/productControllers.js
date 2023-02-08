const Product = require("../models/productModel");
const User = require("../models/userModel");

const addProduct = async (req, res) => {
  const { name, description, price, image } = req.body;
  const user = await User.findById(req.user.id);
  if (!name || !description || !price || !image) {
    return res.status(400).json({ message: "Fill all the required data" });
  }
  if (!user.isAdmin) {
    return res.status(400).json({ message: "User doesnt have permission" });
  }
  const newProduct = await Product.create({
    name: name,
    description: description,
    price: price,
    image: image,
    quantity: 1,
  });
  if (newProduct) {
    return res
      .status(201)
      .json({ message: "Product created successfully", id: newProduct._id });
  } else {
    return res.status(400).json({ message: "Invalid credentials" });
  }
};

const removeProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!user.isAdmin) {
    return res.status(400).json({ message: "User doesnt have permission" });
  }
  if (!product) {
    return res.status(400).json({ message: "Product was not found" });
  }
  await Product.deleteOne(product._id);
  return res.status(200).json({ message: "Product deleted successfully" });
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.status(200).json({
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
    });
  } else {
    return res.status(400).json({ message: "Product not found" });
  }
};

const updateProduct = async (req, res) => {
  const { name, description, price, image } = req.body;
  const product = await Product.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!user.isAdmin) {
    return res.status(400).json({ message: "User doesnt have permission" });
  }
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    await product.save();
    return res.status(200).json({ message: "Product updated successfully" });
  } else {
    return res.status(400).json({ message: "Product not found" });
  }
};

module.exports = { addProduct, removeProduct, getProduct, updateProduct };
