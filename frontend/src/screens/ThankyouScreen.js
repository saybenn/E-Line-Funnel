import React, { useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ThankyouScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderGet = useSelector((state) => state.orderGet);
  const { order, loading, error } = orderGet;

  useEffect(() => {
    if (!order) {
      dispatch(getOrder(id));
    }
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Thank You</h1>
          <Row>
            <h2>Order Id:{order._id}</h2>
          </Row>
          <hr />
          Would you like to be mailed a receipt?{" "}
          <Button variant="primary">
            <a
              href={`mailto:${order.customer.email}?subject=E-Shop Order Receipt&body=${order.customer.name}, We at E-Shop greatly appreciate your decision to shop with us!`}
            >
              {order.customer.email}
            </a>
          </Button>
        </>
      )}
    </>
  );
};
export default ThankyouScreen;
