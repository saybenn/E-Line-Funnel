import {
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  GET_CART_RESET,
  EDIT_CART_REQUEST,
  EDIT_CART_SUCCESS,
  EDIT_CART_FAIL,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAIL,
  ADD_TO_CART_RESET,
  DELETE_CART_ITEM_RESET,
  GET_SINGLE_CART_REQUEST,
  GET_SINGLE_CART_SUCCESS,
  GET_SINGLE_CART_FAIL,
  GET_SINGLE_CART_RESET,
  EDIT_CUSTOMER_REQUEST,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_FAIL,
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAIL,
  EDIT_CART_RESET,
  CREATE_CUSTOMER_RESET,
} from "../constants/customerConstants";

export const customerGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CUSTOMER_REQUEST:
      return { loading: true };
    case GET_CUSTOMER_SUCCESS:
      return {
        loading: false,
        customer: action.payload,
      };
    case GET_CUSTOMER_FAIL:
      return { success: false, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CUSTOMER_REQUEST:
      return { loading: true };
    case CREATE_CUSTOMER_SUCCESS:
      return {
        success: true,
        loading: false,
        customer: action.payload,
      };
    case CREATE_CUSTOMER_FAIL:
      return { success: false, loading: false, error: action.payload };
    case CREATE_CUSTOMER_RESET:
      return {};
    default:
      return state;
  }
};

export const customerEditReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_CUSTOMER_REQUEST:
      return { loading: true };
    case EDIT_CUSTOMER_SUCCESS:
      return {
        success: true,
        loading: false,
        customer: action.payload,
      };
    case EDIT_CUSTOMER_FAIL:
      return { success: false, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cartAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { loading: true };
    case ADD_TO_CART_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case ADD_TO_CART_FAIL:
      return { success: false, loading: false, error: action.payload };
    case ADD_TO_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const cartGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return { loading: true };
    case GET_CART_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload,
      };
    case GET_CART_FAIL:
      return { loading: false, error: action.payload };
    case GET_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const cartGetSingleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CART_REQUEST:
      return { loading: true };
    case GET_SINGLE_CART_SUCCESS:
      return {
        loading: false,
        cartItem: action.payload,
      };
    case GET_SINGLE_CART_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const cartEditReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_CART_REQUEST:
      return { success: false, loading: true };
    case EDIT_CART_SUCCESS:
      return {
        success: true,
        loading: false,
        cartItem: action.payload,
      };
    case EDIT_CART_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const cartDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CART_ITEM_REQUEST:
      return { loading: true };
    case DELETE_CART_ITEM_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case DELETE_CART_ITEM_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_CART_ITEM_RESET:
      return {};
    default:
      return state;
  }
};
