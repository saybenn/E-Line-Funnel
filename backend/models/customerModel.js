import mongoose from "mongoose";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

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

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Email address is required",
      validate: [validateEmail, "Please supply a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true, minLength: 5, maxLength: 9 },
      country: { type: String, required: true },
    },
    cartItems: [cartSchema],
    orders: {
      type: mongoose.Schema.Types.ObjectID,
      required: false,
      ref: "Order",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
