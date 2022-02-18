import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";

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

  let returnPrice = price;
  return +returnPrice;
};

//@desc create customer
//@route post /api/customers
//@access public
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, address, city, state, postalCode, country } = req.body;
  const customerExists = await Customer.findOne({ email });

  if (customerExists) {
    res.status(400);
    throw new Error("Email already registered to a shopper.");
  }
  if (!customerExists) {
    try {
      const dbCustomer = await Customer.create({
        name,
        email,
        shippingAddress: {
          address: address,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
      });
      const customer = await dbCustomer.save();
      res.status(201).json(customer);
    } catch (error) {
      res.status(500);
      let stateError = error.message.search("state");
      let emailError = error.message.search("email");
      let zipError = error.message.search("postal");

      if (stateError !== -1) {
        throw new Error("Please reselect Shipping State.");
      }
      if (zipError !== -1) {
        throw new Error("Postal Codes should be between 5 and 9 numbers.");
      }
      if (emailError !== -1) {
        throw new Error(error);
      } else {
        throw new Error(error);
      }
    }
  }
});

//@desc edit customer
//@route post /api/customers
//@access public
const editCustomer = asyncHandler(async (req, res) => {
  const { name, email, address, city, state, postalCode, country } = req.body;
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    try {
      customer.name = name;
      customer.email = email;
      customer.shippingAddress.address = address;
      customer.shippingAddress.city = city;
      customer.shippingAddress.state = state;
      customer.shippingAddress.postalCode = postalCode;
      customer.shippingAddress.country = country;

      await customer.save();
      res.json(customer);
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  }
});

//@desc Get Customer
//@route get /api/customer/:id
//@access user
const getCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error("Customer could not be found.");
  }
});

//@desc Get Customer Cart
//@route get /api/customer/cart
//@access user
const getCustomerCart = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    res.json(customer.cartItems);
  } else {
    res.status(404);
    throw new Error("Cart Items could not be found");
  }
});

//@desc Add Items to Customer Cart
//@route post /api/customer/cart/:customerid
//@access user
const addItemToCart = asyncHandler(async (req, res) => {
  const { product, qtySmall, qtyMedium, qtyLarge, qtyXtraLarge, color } =
    req.body;
  const customer = await Customer.findById(req.params.id);
  if (!qtySmall && !qtyMedium && !qtyLarge && !qtyXtraLarge) {
    res.status(400);
    throw new Error("Please select items to be added to cart.");
  }
  if (customer) {
    const cartItem = {
      product,
      qtySmall,
      qtyMedium,
      qtyLarge,
      qtyXtraLarge,
      color: color.toUpperCase(),
      priceSmall: getPrice(qtySmall),
      priceMedium: getPrice(qtyMedium),
      priceLarge: getPrice(qtyLarge),
      priceXtraLarge: getPrice(qtyXtraLarge),
      itemTotal: (
        getPrice(qtySmall) +
        getPrice(qtyMedium) +
        getPrice(qtyLarge) +
        getPrice(qtyXtraLarge)
      ).toFixed(2),
    };
    customer.cartItems.push(cartItem);
    await customer.save();
    res.json(customer.cartItems);
  } else {
    res.status(400);
    throw new Error("Addition to cart could not be made.");
  }
});

//@desc Edit to Customer CartItem
//@route put /api/customer/cart/:cartid
//@access user
const editCartItem = asyncHandler(async (req, res) => {
  const { customerId, qtySmall, qtyMedium, qtyLarge, qtyXtraLarge, color } =
    req.body;
  const customer = await Customer.findById(customerId);
  const cartItem = await customer.cartItems.find(
    (c) => c._id.toString() === req.params.id.toString()
  );
  if (qtySmall == 0 && qtyMedium == 0 && qtyLarge == 0 && qtyXtraLarge == 0) {
    await cartItem.remove();
    await customer.save();
    res.json({ message: "Item deleted from cart" });
  }

  if (cartItem) {
    cartItem.product = cartItem.product;
    cartItem.qtySmall = qtySmall;
    cartItem.qtyMedium = qtyMedium;
    cartItem.qtyLarge = qtyLarge;
    cartItem.qtyXtraLarge = qtyXtraLarge;
    cartItem.color = color.toUpperCase();
    cartItem.priceSmall = getPrice(qtySmall);
    cartItem.priceMedium = getPrice(qtyMedium);
    cartItem.priceLarge = getPrice(qtyLarge);
    cartItem.priceXtraLarge = getPrice(qtyXtraLarge);
    cartItem.itemTotal = (
      getPrice(qtySmall) +
      getPrice(qtyMedium) +
      getPrice(qtyLarge) +
      getPrice(qtyXtraLarge)
    ).toFixed(2);

    await customer.save();
    res.json(customer.cartItems);
  } else {
    res.status(400);
    throw new Error("Edit to cart could not be made.");
  }
});

//@desc Delete to  CartItem
//@route delete /api/customer/cart/:cartid
//@access user
const deleteCartItem = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.cid);
  const cartItem = await customer.cartItems.find((c) => {
    return c._id.toString() === req.params.id.toString();
  });
  if (cartItem) {
    await cartItem.remove();
    await customer.save();
    res.json({ message: "Item Deleted." });
  } else {
    res.status(400);
    throw new Error("Unexpected error occured. Please try again.");
  }
});

//@desc Get Single CartItem
//@route GET /api/customers/cart/:id
//@access User
const getSingleCartItem = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.cid);
  const cartItem = await customer.cartItems.find((c) => {
    return c._id.toString() == req.params.id.toString();
  });
  if (!cartItem) {
    res.status(404);
    throw new Error("Cart item not found.");
  } else {
    res.json(cartItem);
  }
});

export {
  createCustomer,
  editCustomer,
  addItemToCart,
  getCustomer,
  getCustomerCart,
  editCartItem,
  deleteCartItem,
  getSingleCartItem,
};
