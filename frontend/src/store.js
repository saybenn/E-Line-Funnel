import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productGetReducer,
  getLineupsReducer,
  orderCreateReducer,
  orderGetReducer,
  customerOrdersReducer,
  orderPayReducer,
} from "./reducers/generalReducer";
import {
  customerCreateReducer,
  customerEditReducer,
  customerGetReducer,
  cartAddReducer,
  cartGetReducer,
  cartSingleItemReducer,
  cartEditReducer,
  cartDeleteReducer,
} from "./reducers/customerReducer";
import {
  adminLoginReducer,
  userListReducer,
  orderListReducer,
  orderDeliverReducer,
  productListReducer,
  productCreateReducer,
  productDeleteReducer,
  getProductReducer,
  productEditReducer,
} from "./reducers/adminReducer";
const reducer = combineReducers({
  adminLogin: adminLoginReducer,
  userList: userListReducer,
  orderList: orderListReducer,
  productList: productListReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productEdit: productEditReducer,
  getProduct: getProductReducer,
  customerCreate: customerCreateReducer,
  customerEdit: customerEditReducer,
  customerGet: customerGetReducer,
  cartAdd: cartAddReducer,
  cartGet: cartGetReducer,
  cartSingleItem: cartSingleItemReducer,
  cartEdit: cartEditReducer,
  cartDelete: cartDeleteReducer,
  productGet: productGetReducer,
  lineupGet: getLineupsReducer,
  orderCreate: orderCreateReducer,
  orderDeliver: orderDeliverReducer,
  customerOrders: customerOrdersReducer,
  orderGet: orderGetReducer,
  orderPay: orderPayReducer,
});
const customerInfoFromStorage = localStorage.getItem("e-shopCustomer")
  ? JSON.parse(localStorage.getItem("e-shopCustomer"))
  : null;

const adminInfoFromStorage = localStorage.getItem("e-shopAdminInfo")
  ? JSON.parse(localStorage.getItem("e-shopAdminInfo"))
  : null;

const initialState = {
  customerCreate: { customer: customerInfoFromStorage },
  adminLogin: { adminInfo: adminInfoFromStorage },
};

const middleware = [thunk];

const composeEnhance = composeWithDevTools({
  trace: true,
  traceLimit: 10,
});

const store = createStore(
  reducer,
  initialState,
  composeEnhance(applyMiddleware(...middleware))
);

export default store;
