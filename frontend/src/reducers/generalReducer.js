import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_RESET,
  GET_ORDER_SUCCESS,
  CUSTOMER_ORDERS_FAIL,
  CUSTOMER_ORDERS_REQUEST,
  CUSTOMER_ORDERS_RESET,
  CUSTOMER_ORDERS_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
} from "../constants/orderConstants";
import {
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_RESET,
  GET_LINEUPS_REQUEST,
  GET_LINEUPS_SUCCESS,
  GET_LINEUPS_FAIL,
  GET_LINEUPS_RESET,
} from "../constants/productConstants";

export const productGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return { loading: true };
    case GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const getLineupsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LINEUPS_REQUEST:
      return { loading: true };
    case GET_LINEUPS_SUCCESS:
      return {
        loading: false,
        lineups: action.payload,
      };
    case GET_LINEUPS_FAIL:
      return { loading: false, error: action.payload };
    case GET_LINEUPS_RESET:
      return {};
    default:
      return state;
  }
};

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { success: true, loading: false, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { success: false, loading: false, error: action.payload };
    case CREATE_ORDER_RESET:
      return { ...state, success: false };
    default:
      return state;
  }
};

export const orderGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true };
    case GET_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case GET_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const customerOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_ORDERS_REQUEST:
      return { loading: true };
    case CUSTOMER_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case CUSTOMER_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_ORDERS_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return { loading: true };
    case PAY_ORDER_SUCCESS:
      return { loading: false, success: true };
    case PAY_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
