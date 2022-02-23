import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { GET_ORDER_RESET } from "../constants/orderConstants";

const ThankyouScreen = () => {
  //Hooks
  const [sent, setSent] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  //Selectors
  const orderGet = useSelector((state) => state.orderGet);
  const { order, loading, error } = orderGet;

  //UseEffect
  useEffect(() => {
    if (!order) {
      dispatch(getOrder(id));
    }
    if (order && !order.isPaid) {
      dispatch({ type: GET_ORDER_RESET });
    }
  }, [order, dispatch, id]);

  //Handlers
  const handleSend = async () => {
    setSent(true);
    try {
      await axios.post("http://localhost:3000/send_thankyou", {
        order,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {sent && <Message variant="success">Receipt has been mailed</Message>}
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : order ? (
        <>
          <h1>Thank You</h1>
          <Row>
            <h2>Order Id:{order._id}</h2>
          </Row>
          <hr />
          Would you like to be mailed a receipt?{" "}
          <Button className="mx-1" variant="primary" onClick={handleSend}>
            {order.customer.email}
          </Button>
        </>
      ) : (
        loading && <Loader />
      )}
    </>
  );
};
export default ThankyouScreen;
