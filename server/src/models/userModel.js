const mongoose = require("mongoose");
const Cart = require("./cartModel");
const cartSchema = Cart.schema;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: Boolean,
  activeCart: cartSchema,
  purchasedCarts: [cartSchema],
});

module.exports = mongoose.model("User", userSchema);
