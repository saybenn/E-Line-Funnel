import express from "express";
const router = express.Router();
import {
  addItemToCart,
  createCustomer,
  editCustomer,
  deleteCartItem,
  editCartItem,
  getCustomerCart,
  getSingleCartItem,
  getCustomer,
} from "../controllers/customerController.js";
import { getUserOrders } from "../controllers/orderController.js";

router
  .route("/cart/:id")
  .post(addItemToCart)
  .get(getCustomerCart)
  .put(editCartItem);
router.route("/cart/:cid/:id").get(getSingleCartItem).delete(deleteCartItem);
router.route("/:id").put(editCustomer).get(getCustomer);
router.get("/orders/:id", getUserOrders);
router.post("/", createCustomer);

export default router;
