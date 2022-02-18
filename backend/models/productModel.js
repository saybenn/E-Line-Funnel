import mongoose from "mongoose";

const priceSchema = mongoose.Schema({
  price1: {
    type: Number,
    required: true,
    default: 0,
  },
  price2: {
    type: Number,
    required: true,
    default: 0,
  },
  price4: {
    type: Number,
    required: true,
    default: 0,
  },
  price6: {
    type: Number,
    required: true,
    default: 0,
  },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lineUp: {
      required: false,
      type: String,
    },
    basePrice: {
      required: false,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
