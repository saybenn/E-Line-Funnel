import express from "express";
const router = express.Router();
import { getLineups, getProduct } from "../controllers/productController.js";

router.get("/:lineup", getProduct);
router.get("/deal/:lineup", getLineups);
export default router;
