import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Customer from "../models/customerModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Register a new user
//@route POST /api/users
//@access public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Get all users
//@route GET /api/admin/users
//@access Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({});

  if (customers) {
    res.json(customers);
  } else {
    res.status(404);
    throw new Error("Customers not found");
  }
});

//@desc Get single users
//@route GET /api/admin/users/:id
//@access Admin
const getUser = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//@desc Get users orders
//@route GET /api/admin/users/orders/:id
//@access Admin
const getUserOrders = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  const orders = await Order.find({});
  const customerOrders = orders.filter((o) => {
    return o.customer.id == req.params.id;
  });
  if (customer) {
    res.json(customerOrders);
  } else {
    res.status(404);
    throw new Error("Customer orders not found");
  }
});

//@desc Delete user
//@route DELETE /api/admin/users/:id
//@access Admin
const deleteUser = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  const orders = await Order.find({});
  const customerOrders = orders.filter((o) => {
    return o.customer.id == req.params.id;
  });

  if (customer) {
    await customer.remove();
    await customerOrders.remove();
    res.json({ message: "Customer deleted." });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//@desc Get all orders
//@route GET /api/admin/orders
//@access Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

//@desc Get single order
//@route GET /api/admin/orders/id
//@access Admin
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

//@desc Deliver Order
//@route put /api/admin/orders/deliver
//@access User
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc Get all products
//@route GET /api/admin/products
//@access Admin
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

//@desc Create a Product
//@route POST /api/admin/products
//@access Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    image: "/images/sample.jpg",
    description: "Sample description",
    basePrice: 0,
    lineUp,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc Edit a Product
//@route Put /api/admin/products/:id
//@access Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, lineUp, basePrice } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.basePrice = basePrice;
    product.description = description;
    product.lineUp = lineUp;
    const updatedProduct = await product.save();
    res.status(201).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Delete a Product
//@route DELETE /api/admin/products/:id
//@access Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product deleted." });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  authAdmin,
  registerAdmin,
  getAllOrders,
  getAllProducts,
  getAllUsers,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteUser,
  getUser,
  getUserOrders,
  getOrder,
  updateOrderToDelivered,
};
