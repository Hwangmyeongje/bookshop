const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeToCartItem,
} = require("../controller/CartController");

router.use(express.json());

//장바구니 담기
router.post("/", addToCart);

//장바구니 조회 / 선택된 장바구니 아이템 목록조회
router.get("/", getCartItems);

//장바구니 아이템 삭제
router.delete("/:id", removeToCartItem);

module.exports = router;
