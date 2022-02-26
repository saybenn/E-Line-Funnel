import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Image,
  ListGroup,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  deleteCartItem,
  editCustomer,
  getCustomer,
} from "../actions/customerActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DELETE_CART_ITEM_RESET,
  GET_CART_RESET,
} from "../constants/customerConstants";
import { createOrder } from "../actions/orderActions";

const CheckoutScreen = () => {
  //Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("US");
  const [message, setMessage] = useState("");
  const [editState, setEditState] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Selectors
  const customerCreate = useSelector((state) => state.customerCreate);
  const { customer } = customerCreate;
  const customerGet = useSelector((state) => state.customerGet);
  const { customer: dbCustomer } = customerGet;
  const customerEdit = useSelector((state) => state.customerEdit);
  const { success: editSuccess } = customerEdit;
  const cartGet = useSelector((state) => state.cartGet);
  const { cartItems, loading: cartLoading, error: cartError } = cartGet;
  const cartDelete = useSelector((state) => state.cartDelete);
  const { success } = cartDelete;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success: orderSuccess, order } = orderCreate;

  //UseEffect
  useEffect(() => {
    if (!dbCustomer) {
      dispatch(getCustomer(id));
    }

    if (!cartItems) {
      dispatch(getCart(id));
    }

    if (success) {
      dispatch(getCart(customer._id));
      dispatch({ type: DELETE_CART_ITEM_RESET });
      setMessage(`Item has been deleted from your cart.`);
      setTimeout(() => {
        setMessage(false);
      }, 3000);

      if (editSuccess) {
        dispatch(getCustomer(customer._id));
      }
    }

    if (orderSuccess) {
      dispatch({ type: GET_CART_RESET });
      navigate(`/orders/${order._id}`);
    }
  }, [
    cartItems,
    success,
    order,
    dbCustomer,
    customer,
    dispatch,
    orderSuccess,
    id,
    editSuccess,
    navigate,
  ]);

  //Handlers
  const handleDelete = (id) => {
    dispatch(deleteCartItem(id, customer._id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (editState) {
      setEditState(false);
    }
    dispatch(
      editCustomer(
        e.target.name.value,
        e.target.email.value,
        e.target.address.value,
        e.target.city.value,
        e.target.state.value,
        e.target.postalCode.value,
        e.target.country.value,
        dbCustomer._id
      )
    );
  };

  const orderHandler = () => {
    dispatch(createOrder(cartItems, dbCustomer._id));
  };

  //Functions
  const toggleEdit = () => {
    if (!editState) {
      setEditState(true);
    }
  };

  return (
    <>
      {" "}
      <h1>CheckOut</h1>
      <Row className="my-5">
        {message && <Message variant="info">{message}</Message>}
        <Col md={9}>
          <h3>Cart Items</h3>
          {cartLoading && <Loader />}
          {cartError && <Message variant="danger">{cartError}</Message>}
          {cartItems && (
            <Card>
              <ListGroup variant="flush">
                {cartItems.map((cartItem) => {
                  return (
                    <ListGroup.Item key={cartItem._id}>
                      <Row className="d-flex align-items-center">
                        <Col md={1} className="d-flex justify-space-between">
                          <Link to={`/cart/${cartItem._id}`}>
                            <Image
                              src={cartItem.product.image}
                              alt={cartItem.product.name}
                              rounded
                              sm={1}
                              fluid
                            ></Image>
                          </Link>
                        </Col>{" "}
                        <Col md={2}>{cartItem.product.name}</Col>
                        <Col md={2}>{cartItem.color}</Col>
                        <Col md={3} className="align-items-center d-flex">
                          <Form.Label className="checkout-label">
                            S:{cartItem.qtySmall}
                          </Form.Label>

                          <Form.Label className="checkout-label ms-3">
                            M:{cartItem.qtyMedium}
                          </Form.Label>

                          <Form.Label className="checkout-label ms-3">
                            L:{cartItem.qtyLarge}
                          </Form.Label>

                          <Form.Label className="checkout-label ms-3">
                            XL:{cartItem.qtyXtraLarge}
                          </Form.Label>
                        </Col>
                        <Col md={2}>${cartItem.itemTotal}</Col>
                        <Col md={2}>
                          <Link to={`/cart/${cartItem._id}`}>
                            <i
                              className="fas fa-edit"
                              style={{ color: "black" }}
                            ></i>
                          </Link>
                          <Button
                            variant="secondary"
                            onClick={() => handleDelete(cartItem._id)}
                          >
                            <i
                              className="fas fa-times"
                              style={{ color: "red", background: "white" }}
                            ></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>
          )}
        </Col>
        <Col md={3}>
          <h3>Order Summary</h3>
          {cartItems && (
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>
                      {` ${cartItems.reduce(
                        (acc, item) =>
                          acc +
                          item.qtySmall +
                          item.qtyMedium +
                          item.qtyLarge +
                          item.qtyXtraLarge,
                        0
                      )} items`}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>SubTotal</Col>
                    <Col>
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.itemTotal, 0)
                        .toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={9}>
          <h3>Customer Information</h3>
          {dbCustomer && (
            <Card>
              <Form className="p-3" onSubmit={submitHandler}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>
                        <strong>Name:</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={name === "" ? dbCustomer.name : name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!editState ? "disabled" : ""}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>
                        <strong>Email:</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={email === "" ? dbCustomer.email : email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!editState ? "disabled" : ""}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="address">
                      <Form.Label>
                        <strong>Street Address:</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          address === ""
                            ? dbCustomer.shippingAddress.address
                            : address
                        }
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={!editState ? "disabled" : ""}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="city">
                      <Form.Label>
                        <strong>City:</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          city === "" ? dbCustomer.shippingAddress.city : city
                        }
                        onChange={(e) => setCity(e.target.value)}
                        disabled={!editState ? "disabled" : ""}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="state">
                      <Form.Label>
                        <strong>State:</strong>
                      </Form.Label>
                      <Form.Select
                        value={
                          state === ""
                            ? dbCustomer.shippingAddress.state
                            : state
                        }
                        required
                        onChange={(e) => setState(e.target.value)}
                        disabled={!editState ? "disabled" : ""}
                      >
                        <option
                          value={dbCustomer.shippingAddress.state}
                          default
                        >
                          {dbCustomer.shippingAddress.state}
                        </option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="postalCode">
                      <Form.Label>
                        <strong>Postal Code:</strong>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={
                          postalCode === ""
                            ? dbCustomer.shippingAddress.postalCode
                            : postalCode
                        }
                        onChange={(e) => setPostalCode(e.target.value)}
                        disabled={!editState ? "disabled" : ""}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="country">
                      <Form.Label>
                        <strong>Country:</strong>
                      </Form.Label>
                      <Form.Select
                        value={
                          country === ""
                            ? dbCustomer.shippingAddress.country
                            : country
                        }
                        required
                        onChange={(e) => setCountry(e.target.value)}
                        disabled={!editState ? "disabled" : ""}
                      >
                        <option
                          value={dbCustomer.shippingAddress.country}
                          default
                        >
                          {dbCustomer.shippingAddress.country}
                        </option>
                        <option value="US">United States</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={3}>
                    {!editState ? (
                      <Button
                        type="submit"
                        className="my-3"
                        variant="primary"
                        onClick={toggleEdit}
                      >
                        Edit Shipping
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="my-3"
                        variant="primary"
                        onClick={toggleEdit}
                        disabled
                      >
                        Edit Shipping
                      </Button>
                    )}{" "}
                  </Col>
                  <Col md={3}>
                    {editState ? (
                      <Button
                        type="submit"
                        className="my-3"
                        variant="outline-dark"
                      >
                        Submit Update
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="my-3"
                        variant="outline-dark"
                        disabled
                      >
                        Submit Update
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </Card>
          )}
        </Col>

        <Col md={3}>
          <h3>Checkout</h3>
          <Card className="p-3">
            <Button variant="primary" onClick={orderHandler}>
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckoutScreen;
