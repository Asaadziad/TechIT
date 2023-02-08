const express = require("express");
const {
  getProduct,
  removeProduct,
  updateProduct,
  addProduct,
} = require("../controllers/productControllers");
const { authneticate } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(authneticate, addProduct);
router
  .route("/:id")
  .get(getProduct)
  .delete(authneticate, removeProduct)
  .put(authneticate, updateProduct);

module.exports = router;
