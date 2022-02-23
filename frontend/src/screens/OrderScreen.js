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
import { getCustomer } from "../actions/customerActions";
import { deliverOrder } from "../actions/adminActions";
import { GET_ORDER_RESET } from "../constants/orderConstants";
import { ORDER_DELIVER_RESET } from "../constants/adminConstants";

const stripePromise = loadStripe(
  "pk_test_51KKpJTEtP2KkpzutQSRbBVwTPeOaNym5Syj241GIDMfcUsQYc7jg93mdaKbB7YXPCOsWl9bEvuH9UCbin0vUMPRH00aPV2KCXr"
);

const OrderScreen = () => {
  //Hooks
  const [clientSecret, setClientSecret] = useState("");
  const [show, setShow] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();

  //Selectors
  const orderGet = useSelector((state) => state.orderGet);
  const { order, loading, error } = orderGet;
  const customerCreate = useSelector((state) => state.customerCreate);
  const { customer } = customerCreate;
  const customerGet = useSelector((state) => state.customerGet);
  const { customer: dbCustomer } = customerGet;
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success } = orderDeliver;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order: createOrder } = orderCreate;

  //UseEffect
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

    if (order && createOrder && order._id !== createOrder._id) {
      dispatch({ type: GET_ORDER_RESET });
    }

    if (order && !order.isPaid) {
      stripeHandler();
    }

    if (success) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: GET_ORDER_RESET });
    }
  }, [dispatch, order, id, success, createOrder]);

  //Handlers
  const handleShowStripe = () => {
    dispatch(getCustomer(order.customer.id));
    setShow(false);
  };

  const deliverOrderHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  //Stripe Config
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
                      ) : adminInfo && adminInfo.isAdmin && order.isPaid ? (
                        <Button variant="info" onClick={deliverOrderHandler}>
                          Set Order Delivered
                        </Button>
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
                  {adminInfo && adminInfo.isAdmin ? (
                    <Button disabled variant="primary">
                      Pay Here
                    </Button>
                  ) : (
                    <ListGroup>
                      <ListGroup.Item>
                        {order &&
                        customer &&
                        !order.isPaid &&
                        customer._id === order.customer.id &&
                        clientSecret ? (
                          <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm clientSecret={clientSecret} id={id} />
                          </Elements>
                        ) : (
                          show &&
                          !order.isPaid && (
                            <Button
                              variant="primary"
                              onClick={handleShowStripe}
                            >
                              Load Stripe
                            </Button>
                          )
                        )}
                        {order &&
                          dbCustomer &&
                          !order.isPaid &&
                          dbCustomer._id === order.customer.id &&
                          clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                              <CheckoutForm
                                clientSecret={clientSecret}
                                id={id}
                              />
                            </Elements>
                          )}
                        {order && order.isPaid && (
                          <Link to={`/thankyou/${id}`}>
                            <Button variant="primary">Thank You</Button>
                          </Link>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  )}
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
