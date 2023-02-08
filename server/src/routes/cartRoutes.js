const express = require("express");
const {
  getCart,
  purchaseCart,
  getAllPreviousCarts,
  addProductToCart,
} = require("../controllers/cartControllers");
const { authneticate } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authneticate, getCart);
router.route("/:productId").post(authneticate, addProductToCart);
router.route("/purchase", authneticate, purchaseCart);
router.route("/history").get(authneticate, getAllPreviousCarts);

module.exports = router;
