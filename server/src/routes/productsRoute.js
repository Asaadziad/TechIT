const express = require("express");
const {
  getProduct,
  removeProduct,
  updateProduct,
  addProduct,
} = require("../controllers/productControllers");
const router = express.Router();

router.post("/", addProduct);
router.get("/:id", getProduct).delete(removeProduct).put(updateProduct);

module.exports = router;
