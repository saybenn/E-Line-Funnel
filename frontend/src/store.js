import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productGetReducer,
  getLineupsReducer,
  orderCreateReducer,
  orderGetReducer,
  ordersGetReducer,
  orderPayReducer,
} from "./reducers/generalReducer";
import {
  customerCreateReducer,
  customerEditReducer,
  customerGetReducer,
  cartAddReducer,
  cartGetReducer,
  cartGetSingleReducer,
  cartEditReducer,
  cartDeleteReducer,
} from "./reducers/customerReducer";
import {
  adminLoginReducer,
  userListReducer,
  orderListReducer,
  productListReducer,
} from "./reducers/adminReducer";
const reducer = combineReducers({
  adminLogin: adminLoginReducer,
  userList: userListReducer,
  orderList: orderListReducer,
  productList: productListReducer,
  customerCreate: customerCreateReducer,
  customerEdit: customerEditReducer,
  customerGet: customerGetReducer,
  cartAdd: cartAddReducer,
  cartGet: cartGetReducer,
  cartGetSingle: cartGetSingleReducer,
  cartEdit: cartEditReducer,
  cartDelete: cartDeleteReducer,
  productGet: productGetReducer,
  lineupGet: getLineupsReducer,
  orderCreate: orderCreateReducer,
  ordersGet: ordersGetReducer,
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
