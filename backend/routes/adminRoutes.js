import express from "express";
const router = express.Router();
import {
  authAdmin,
  createProduct,
  deleteProduct,
  deleteUser,
  getAllOrders,
  getAllProducts,
  getAllUsers,
  getOrder,
  getUser,
  getUserOrders,
  registerAdmin,
  updateOrderToDelivered,
  updateProduct,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", authAdmin);
router.post("/", registerAdmin);
router.get("/orders", protect, admin, getAllOrders);
router.get("/customers", protect, admin, getAllUsers);
router
  .route("/products")
  .get(protect, admin, getAllProducts)
  .post(protect, admin, createProduct);
router
  .route("/products/:id")
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router
  .route("/customers/:id")
  .get(protect, admin, getUser)
  .delete(protect, admin, deleteUser);
router.get("/customers/orders/:id", protect, admin, getUserOrders);
router
  .route("/orders/:id")
  .get(protect, admin, getOrder)
  .put(protect, admin, updateOrderToDelivered);
export default router;
