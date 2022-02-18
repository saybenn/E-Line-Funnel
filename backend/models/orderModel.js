import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  product: { type: Object, required: true },
  qtySmall: { type: Number, required: true },
  qtyMedium: { type: Number, required: true },
  qtyLarge: { type: Number, required: true },
  qtyXtraLarge: { type: Number, required: true },
  priceSmall: { type: Number, required: true },
  priceMedium: { type: Number, required: true },
  priceLarge: { type: Number, required: true },
  priceXtraLarge: { type: Number, required: true },
  color: { type: String, required: false },
  itemTotal: { type: Number, required: true },
});

const orderSchema = mongoose.Schema(
  {
    customer: {
      id: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "Customer",
      },

      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        lowercase: true,
      },
      shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: {
          type: String,
          required: true,
          minLength: 5,
          maxLength: 9,
        },
        country: { type: String, required: true },
      },
    },

    orderItems: [cartSchema],
    subTotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
