import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Customer from "../models/customerModel.js";

//Get Order Prices
const getPrice = (qty) => {
  var price;
  switch (+qty) {
    case 0:
      price = 0;
      break;
    case 1:
      price = 14.99;
      break;
    case 2:
      price = 24.99;
      break;
    case 3:
      price = 29.99;
      break;
    case 4:
      price = 34.99;
      break;
    case 5:
      price = 39.99;
      break;
    case 6:
      price = 49.99;
      break;
    default:
      price = 0;
      break;
  }

  let returnPrice = +price;
  return returnPrice;
};

const getTaxPrice = (total) => {
  var price = Number((0.15 * total).toFixed(2));
  return +price;
};

const getShippingPrice = (total) => {
  var price = total >= 100 ? 20 : 10;
  return +price;
};

//@desc Create Order
//@route POST /api/orders
//@access User
const createOrder = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;
  const customer = await Customer.findById(req.params.id);

  //Get Small Items Totals
  const smallItems = cartItems.map((c) => {
    return getPrice(c.qtySmall);
  });
  const smallSum = smallItems.reduce((num, a) => num + a, 0);

  //Get Medium Items Totals
  const mediumItems = cartItems.map((c) => {
    return getPrice(c.qtyMedium);
  });
  const mediumSum = mediumItems.reduce((num, a) => num + a, 0);

  //Get Large Items Totals
  const largeItems = cartItems.map((c) => {
    return getPrice(c.qtyLarge);
  });
  const largeSum = largeItems.reduce((num, a) => num + a, 0);

  //Get ExtraLarge Items Totals
  const xtraLargeItems = cartItems.map((c) => {
    return getPrice(c.qtyXtraLarge);
  });
  const xtraLargeSum = xtraLargeItems.reduce((num, a) => num + a, 0);

  //Total of All Sizes
  const sumTotal = (smallSum + mediumSum + largeSum + xtraLargeSum).toFixed(2);
  try {
    const order = new Order({
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        shippingAddress: {
          address: customer.shippingAddress.address,
          state: customer.shippingAddress.state,
          city: customer.shippingAddress.city,
          postalCode: customer.shippingAddress.postalCode,
          country: customer.shippingAddress.country,
        },
      },

      orderItems: cartItems.map((c) => {
        return c;
      }),
      subTotal: sumTotal,
      taxPrice: getTaxPrice(sumTotal),
      shippingPrice: getShippingPrice(sumTotal),
      totalPrice: (
        +getTaxPrice(sumTotal) +
        +sumTotal +
        +getShippingPrice(sumTotal)
      ).toFixed(2),
    });
    const createdOrder = await order.save();
    (customer.orders = createdOrder._id), (customer.cartItems = []);
    await customer.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc Pay Order
//@route put /api/orders/:id/pay
//@access User
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc Get Order
//@route get /api/orders/:id
//@access User
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

//@desc Get All Order
//@route get /api/orders/:cid
//@access User
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  const customerOrders = orders.filter((o) => {
    return o.customer.id == req.params.id;
  });

  if (customerOrders) {
    res.json(customerOrders);
  } else {
    res.status(404);
    throw new Error("Orders not found.");
  }
});

export { createOrder, updateOrderToPaid, getOrder, getUserOrders };
