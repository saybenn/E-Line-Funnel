import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc Get Product
//@Route Get /api/products/:lineup
//@access public
const getProduct = asyncHandler(async (req, res) => {
  const product = await (
    await Product.find({})
  ).filter((p) => {
    return p.lineUp.toLowerCase() === req.params.lineup.toLowerCase();
  });
  if (product) {
    res.json(product[0]);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@desc Get all Product
//@Route Get /api/products
//@access public
const getLineups = asyncHandler(async (req, res) => {
  const products = await (
    await Product.find({})
  ).filter((p) => {
    return p.lineUp.toLowerCase() !== req.params.lineup.toLowerCase();
  });
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Products Not Found");
  }
});

export { getProduct, getLineups };
