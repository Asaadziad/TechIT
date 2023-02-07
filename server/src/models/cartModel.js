const mongoose = require("mongoose");
const Product = require("./productModel");

const productSchema = Product.schema;

const cartSchema = new mongoose.Schema({
  products: [productSchema],
  userId: mongoose.SchemaTypes.ObjectId,
  isAcitve: Boolean,
});

module.exports = mongoose.model("Cart", cartSchema);
