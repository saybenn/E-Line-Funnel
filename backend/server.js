import express from "express";
import Stripe from "stripe";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import Customer from "./models/customerModel.js";
import Order from "./models/orderModel.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

//Server Setup
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

//Build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

//Image Uploading
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//Node Mailer
//Google Api/OAuth Setup
const OAuth2 = google.auth.OAuth2;
const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token : (");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_EMAIL,
      pass: "22Cambri1232!",
      accessToken,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

//newsletter
app.post("/send_newsletter", cors(), async (req, res) => {
  const sendEmail = async (emailOptions) => {
    try {
      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail(emailOptions);
    } catch (error) {
      console.log(error);
    }
  };
  const customers = await Customer.find({});
  await customers.map((c) => {
    console.log(req.body.subject, c.email);
    sendEmail({
      subject: req.body.subject,
      to: c.email,
      from: process.env.GMAIL_EMAIL,
      html: `<div class="email">
  <div style="background: #333; padding: 1.5rem; color: white;"class="heading"><h2>E-Shop - ${req.body.subject}</h2></div>
  <div style="padding: .5rem 2rem 2rem; border: 1px solid #333; background: white;" class="body"><h4>Dear ${c.name},</h4>
    <p>${req.body.text}</p>
  
  <p>Thanks for using E-Line!</p>
</div>
</div>`,
    });
  });
});

app.post("/send_thankyou", cors(), async (req, res) => {
  const sendEmail = async (emailOptions) => {
    try {
      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail(emailOptions);
    } catch (error) {
      console.log(error);
    }
  };

  let content = req.body.order.orderItems.reduce(function (a, b) {
    return (
      a +
      '<tr style="border-collapse: collapse; border-bottom: 1px solid #333; border-top: 1px solid #333;"> <td style="padding: .2rem; border-right: 1px solid #333;">' +
      b.product.name +
      '</td> <td style="padding: .2rem; border-right: 1px solid #333;">' +
      b.color +
      '</td><td style="padding: .2rem; border-right: 1px solid #333;"> Small: ' +
      b.qtySmall +
      " Medium: " +
      b.qtyMedium +
      " Large: " +
      b.qtyLarge +
      " XL: " +
      b.qtyXtraLarge +
      '</td>  <td style="padding: .2rem; border-right: 1px solid #333;">' +
      "$" +
      b.itemTotal +
      "</td></tr>"
    );
  }, "");

  sendEmail({
    subject: "Your E-Shop order has been received!",
    to: req.body.order.customer.email,
    from: process.env.GMAIL_EMAIL,
    html:
      `<div class="email">
  <div style="background: #333; padding: 1.5rem; color: white;"class="heading"><h2>Thanks for shopping with us!</h2></div>
  <div style="padding: .5rem 2rem 2rem; border: 1px solid #333; background: white;" class="body"><h4>Hi ${req.body.order.customer.name},</h4>
    <p>We've received your order and it's now being processed.</p>
  <h3 style="color: #333">Order #${req.body.order._id}</h3>
<table style="width:65%; border: 1px solid #333; border-collapse: collapse;">
  <tr style="padding:.5rem;">
    <th style="border: 1px solid #333; border-collapse: collapse;">Product</th>
    <th style="border: 1px solid #333; border-collapse: collapse;">Color</th>
    <th style="border: 1px solid #333; border-collapse: collapse;">Quantity</th>
    <th style="border: 1px solid #333; border-collapse: collapse;">Price</th>
  </tr>` +
      content +
      ` <tr style="border-bottom: 1px solid #333;">
    <td colspan="2" style="padding: .2rem; border-right: 1px solid #333; "><strong>Subtotal:</strong></td>
    <td>$${req.body.order.subTotal}</td>
  </tr>
  <tr style="border-bottom: 1px solid #333;">
    <td colspan="2" style="border-right: 1px solid #333; padding: .2rem;"><strong>Shipping:</strong></td>
    <td>$${req.body.order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
    <td colspan="2" style="border-right: 1px solid #333; padding: .2rem;"><strong>Total:</strong></td>
    <td>$${req.body.order.totalPrice}</td>
  </tr>
</table>
<div class="footer">
  <div class="shipping">
    <h3>Shipping Address</h3>
    <div style="border: 1px solid #333; padding:.1rem;">
      <p>${req.body.order.customer.name}<br>${
        req.body.order.customer.shippingAddress.address
      }<br>${req.body.order.customer.shippingAddress.city}, ${
        req.body.order.customer.shippingAddress.state
      } ${req.body.order.customer.shippingAddress.postalCode}<br>${
        req.body.order.customer.email
      }</p>
    </div>
  </div>
  <p>Thanks for using E-Line!</p>
</div>
</div>
</div>`,
  });
});

//Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = async (id) => {
  const order = await Order.findById(id);
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

//Error Routes
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`)
);
