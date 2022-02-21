import express from "express";
const router = express.Router();
import {
  authAdmin,
  createProduct,
  deleteProduct,
  getAllOrders,
  getAllProducts,
  getAllUsers,
  getProduct,
  registerAdmin,
  updateOrderToDelivered,
  updateProduct,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", authAdmin);
router.post("/", registerAdmin);
router.get("/orders", protect, admin, getAllOrders);
router.put("/orders/:id", protect, admin, updateOrderToDelivered);
router.get("/customers", protect, admin, getAllUsers);
router
  .route("/products")
  .get(protect, admin, getAllProducts)
  .post(protect, admin, createProduct);
router
  .route("/products/:id")
  .get(protect, admin, getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
