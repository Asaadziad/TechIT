const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  quantity: Number,
});

module.exports = mongoose.model("Product", productSchema);
