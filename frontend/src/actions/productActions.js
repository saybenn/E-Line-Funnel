import axios from "axios";
import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_LINEUPS_REQUEST,
  GET_LINEUPS_SUCCESS,
  GET_LINEUPS_FAIL,
} from "../constants/productConstants";

export const getProduct = (lineup) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/products/${lineup}`);
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getLineups = (current) => async (dispatch) => {
  try {
    dispatch({ type: GET_LINEUPS_REQUEST });

    const { data } = await axios.get(`/api/products/deal/${current}`);
    dispatch({ type: GET_LINEUPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LINEUPS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
