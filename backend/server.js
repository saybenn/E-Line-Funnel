import express from "express";
import Stripe from "stripe";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import Order from "./models/orderModel.js";
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const calculateOrderAmount = async (id) => {
  const order = await Order.findById(id);
  //figure stripe price
  // let findPrice = product.prices.filter((price) => {
  //   return Object.keys(price).toString().substring(5) === qty.toString();
  // });
  // let amount = Object.values(findPrice[0]);
  return +(order.totalPrice * 100).toFixed(2);
};

app.post("/create-payment-intent", async (req, res) => {
  const { id, name, email } = req.body;
  const customer = await stripe.customers.create({
    name,
    email,
  });

  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    amount: await calculateOrderAmount(id),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    customer: paymentIntent.customer,
    paymentIntent: paymentIntent,
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`)
);
