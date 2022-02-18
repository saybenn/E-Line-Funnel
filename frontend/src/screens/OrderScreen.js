import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const stripePromise = loadStripe(
  "pk_test_51KKpJTEtP2KkpzutQSRbBVwTPeOaNym5Syj241GIDMfcUsQYc7jg93mdaKbB7YXPCOsWl9bEvuH9UCbin0vUMPRH00aPV2KCXr"
);

const OrderScreen = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const orderGet = useSelector((state) => state.orderGet);
  const { order, loading, error } = orderGet;

  useEffect(() => {
    async function stripeHandler() {
      const name = order.customer.name;
      const email = order.customer.email;
      const { data } = await axios.post("/create-payment-intent", {
        id,
        name,
        email,
      });
      setClientSecret(data.clientSecret);
    }

    if (!order) {
      dispatch(getOrder(id));
    }
    if (order && !order.isPaid) {
      stripeHandler();
    }
  }, [dispatch, order, id]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Col>
          {" "}
          {order && (
            <Row className="my-5 d-flex justify-content-between">
              <Col md={7}>
                <h2>Shipping</h2>

                <Card>
                  <ListGroup>
                    <ListGroup.Item>
                      <strong>Name:</strong> {order.customer.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>email:</strong> {order.customer.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Shipping Address:</strong>
                      {` ${order.customer.shippingAddress.address}, ${order.customer.shippingAddress.city}, ${order.customer.shippingAddress.state} ${order.customer.shippingAddress.postalCode}, ${order.customer.shippingAddress.country}`}
                    </ListGroup.Item>
                    <ListGroup.Item className="my-1">
                      {order.isDelivered ? (
                        <Message variant="success">
                          Delivered on {order.deliveredAt.slice(0, 10)}
                        </Message>
                      ) : (
                        <Message variant="danger">
                          Order is not delivered
                        </Message>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {order.isPaid ? (
                        <Message variant="success">
                          Paid on {order.paidAt.slice(0, 10)}
                        </Message>
                      ) : (
                        <Message variant="danger">Order is not paid</Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col md={4}>
                <h2>Order Summary</h2>

                <Card>
                  <ListGroup>
                    <ListGroup.Item>
                      <strong>SubTotal:</strong> ${order.subTotal}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Tax:</strong> ${order.taxPrice}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Shipping:</strong> ${order.shippingPrice}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Total:</strong> ${order.totalPrice}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
          {order && (
            <Row className="my-5 justify-content-between">
              <Col md={7}>
                <h2>Order Items</h2>

                <Card>
                  <ListGroup variant="flush">
                    {order.orderItems.map((item) => {
                      return (
                        <ListGroup.Item key={item._id}>
                          <Row className="d-flex align-items-center">
                            <Col
                              md={1}
                              className="d-flex justify-space-between"
                            >
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                rounded
                                sm={1}
                                fluid
                              ></Image>
                            </Col>{" "}
                            <Col md={2}>{item.product.name}</Col>
                            <Col md={2}>{item.color}</Col>
                            <Col md={4} className="align-items-center d-flex">
                              <Form.Label className="checkout-label">
                                S:{item.qtySmall}
                              </Form.Label>

                              <Form.Label className="checkout-label ms-3">
                                M:{item.qtyMedium}
                              </Form.Label>

                              <Form.Label className="checkout-label ms-3">
                                L:{item.qtyLarge}
                              </Form.Label>

                              <Form.Label className="checkout-label ms-3">
                                XL:{item.qtyXtraLarge}
                              </Form.Label>
                            </Col>
                            <Col md={2}>${item.itemTotal}</Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </Card>
              </Col>
              <Col md={4}>
                <h2>Checkout</h2>
                <Card>
                  <ListGroup>
                    <ListGroup.Item>
                      {order && !order.isPaid && clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                          <CheckoutForm clientSecret={clientSecret} id={id} />
                        </Elements>
                      )}
                      {order && order.isPaid && (
                        <Link to={`/thankyou/${id}`}>
                          <Button variant="primary">Thank You</Button>
                        </Link>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      )}
    </>
  );
};

export default OrderScreen;
