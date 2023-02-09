const express = require("express");
const {
  getProduct,
  removeProduct,
  updateProduct,
  addProduct,
  getAllProducts,
} = require("../controllers/productControllers");
const { authneticate } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/getAll").get(getAllProducts);
router.route("/add").post(authneticate, addProduct);
router
  .route("/:id")
  .get(getProduct)
  .delete(authneticate, removeProduct)
  .put(authneticate, updateProduct);

module.exports = router;
