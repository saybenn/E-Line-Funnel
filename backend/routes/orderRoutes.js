import express from "express";
const router = express.Router();
import {
  createOrder,
  getOrder,
  updateOrderToPaid,
} from "../controllers/orderController.js";
router.route("/:id").post(createOrder).get(getOrder);
router.route("/:id/pay").put(updateOrderToPaid);
export default router;
