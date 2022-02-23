import axios from "axios";
import {
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  GET_CART_SUCCESS,
  GET_CART_REQUEST,
  GET_CART_FAIL,
  EDIT_CART_REQUEST,
  EDIT_CART_SUCCESS,
  EDIT_CART_FAIL,
  DELETE_CART_ITEM_FAIL,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_REQUEST,
  GET_SINGLE_CART_REQUEST,
  GET_SINGLE_CART_SUCCESS,
  GET_SINGLE_CART_FAIL,
  EDIT_CUSTOMER_REQUEST,
  EDIT_CUSTOMER_FAIL,
  EDIT_CUSTOMER_SUCCESS,
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAIL,
} from "../constants/customerConstants";

export const createCustomer = (customer) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CUSTOMER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/customers",
      {
        customer,
      },
      config
    );
    dispatch({ type: CREATE_CUSTOMER_SUCCESS, payload: data });
    localStorage.setItem("e-shopCustomer", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CREATE_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCustomer = (customerId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CUSTOMER_REQUEST });

    const { data } = await axios.get(`/api/customers/${customerId}`);
    dispatch({ type: GET_CUSTOMER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCart = (customerId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const { data } = await axios.get(`/api/customers/cart/${customerId}`);
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleCartItem = (customerId, cartId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CART_REQUEST });

    const { data } = await axios.get(
      `/api/customers/cart/${customerId}/${cartId}`
    );
    dispatch({ type: GET_SINGLE_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCartItem = (cartItemId, customerId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_ITEM_REQUEST });

    await axios.delete(`/api/customers/cart//${customerId}/${cartItemId}`);
    dispatch({ type: DELETE_CART_ITEM_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_CART_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editCart =
  (
    qtySmall,
    qtyMedium,
    qtyLarge,
    qtyXtraLarge,
    color,
    cartItemId,
    customerId
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: EDIT_CART_REQUEST });

      const { data } = await axios.put(`/api/customers/cart/${cartItemId}`, {
        qtySmall,
        qtyMedium,
        qtyLarge,
        qtyXtraLarge,
        color,
        customerId,
      });
      dispatch({ type: EDIT_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EDIT_CART_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editCustomer =
  (name, email, address, city, state, postalCode, country, customerId) =>
  async (dispatch) => {
    try {
      dispatch({ type: EDIT_CUSTOMER_REQUEST });

      const { data } = await axios.put(`/api/customers/${customerId}`, {
        name,
        email,
        address,
        city,
        state,
        postalCode,
        country,
      });
      dispatch({ type: EDIT_CUSTOMER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EDIT_CUSTOMER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addToCart =
  (product, qtySmall, qtyMedium, qtyLarge, qtyXtraLarge, color, customerId) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_CART_REQUEST });

      const { data } = await axios.post(`/api/customers/cart/${customerId}`, {
        product,
        qtySmall,
        qtyMedium,
        qtyLarge,
        qtyXtraLarge,
        color,
      });
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_TO_CART_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
