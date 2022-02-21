import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Image, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleCartItem, editCart } from "../actions/customerActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  EDIT_CART_RESET,
  GET_CART_RESET,
  GET_SINGLE_CART_RESET,
} from "../constants/customerConstants";

const CartItemScreen = () => {
  //Hooks
  const [qtySmall, setQtySmall] = useState("");
  const [priceSmall, setPriceSmall] = useState("");
  const [qtyMedium, setQtyMedium] = useState("");
  const [priceMedium, setPriceMedium] = useState("");
  const [qtyLarge, setQtyLarge] = useState("");
  const [priceLarge, setPriceLarge] = useState("");
  const [qtyXtraLarge, setQtyXtraLarge] = useState("");
  const [priceXtraLarge, setPriceXtraLarge] = useState("");
  const [color, setColor] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  //Selectors
  const cartSingleItem = useSelector((state) => state.cartSingleItem);
  const { cartItem, loading, error } = cartSingleItem;
  const cartEdit = useSelector((state) => state.cartEdit);
  const { success, error: editError } = cartEdit;
  const customerCreate = useSelector((state) => state.customerCreate);
  const { customer } = customerCreate;

  //UseEffect
  useEffect(() => {
    if (!cartItem) {
      dispatch(getSingleCartItem(customer._id, id));
    }
  }, [cartItem, dispatch, customer, id]);

  //Handlers
  const handleSmall = (e) => {
    switch (+e.target.value) {
      case 0:
        setPriceSmall(0);
        break;
      case 1:
        setPriceSmall(14.99);
        break;
      case 2:
        setPriceSmall(24.99);

        break;
      case 3:
        setPriceSmall(29.99);

        break;
      case 4:
        setPriceSmall(34.99);
        break;
      case 5:
        setPriceSmall(39.99);
        break;
      case 6:
        setPriceSmall(49.99);
        break;
      default:
        setPriceSmall(0);
        break;
    }
  };

  const handleMedium = (e) => {
    switch (+e.target.value) {
      case 0:
        setPriceMedium(0);
        break;
      case 1:
        setPriceMedium(14.99);
        break;
      case 2:
        setPriceMedium(24.99);
        break;
      case 3:
        setPriceMedium(29.99);
        break;
      case 4:
        setPriceMedium(34.99);
        break;
      case 5:
        setPriceMedium(39.99);
        break;
      case 6:
        setPriceMedium(49.99);
        break;
      default:
        setPriceMedium(0);
        break;
    }
  };

  const handleLarge = (e) => {
    switch (+e.target.value) {
      case 0:
        setPriceLarge(0);
        break;
      case 1:
        setPriceLarge(14.99);
        break;
      case 2:
        setPriceLarge(24.99);
        break;
      case 3:
        setPriceLarge(29.99);
        break;
      case 4:
        setPriceLarge(34.99);
        break;
      case 5:
        setPriceLarge(39.99);
        break;
      case 6:
        setPriceLarge(49.99);
        break;
      default:
        setPriceLarge(0);
        break;
    }
  };

  const handleXtraLarge = (e) => {
    switch (+e.target.value) {
      case 0:
        setPriceXtraLarge(0);
        break;
      case 1:
        setPriceXtraLarge(14.99);
        break;
      case 2:
        setPriceXtraLarge(24.99);
        break;
      case 3:
        setPriceXtraLarge(29.99);
        break;
      case 4:
        setPriceXtraLarge(34.99);
        break;
      case 5:
        setPriceXtraLarge(39.99);
        break;
      case 6:
        setPriceXtraLarge(49.99);
        break;
      default:
        setPriceXtraLarge(0);
        break;
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      editCart(
        e.target.qtySmall.value,
        e.target.qtyMedium.value,
        e.target.qtyLarge.value,
        e.target.qtyXtraLarge.value,
        e.target.color.value,
        cartItem._id,
        customer._id
      )
    );
    dispatch({ type: GET_SINGLE_CART_RESET });
  };

  const handleBack = () => {
    dispatch({ type: GET_SINGLE_CART_RESET });
    dispatch({ type: GET_CART_RESET });
    dispatch({ type: EDIT_CART_RESET });
  };

  return (
    <>
      <Row>
        <Col md={4} className="my-3">
          <Link to={`/checkout/${customer._id}`}>
            <Button onClick={handleBack} variant="primary">
              Back To Checkout
            </Button>
          </Link>
        </Col>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {success && (
          <Message variant="success">Order Successfully Updated</Message>
        )}
        {editError && <Message variant="danger">{editError}</Message>}
        {cartItem && (
          <Card className="my-3">
            <Card.Body>
              <Row className="d-flex align-items-start">
                <Col md={4}>
                  <Image
                    fluid
                    src={cartItem.product.image}
                    alt={cartItem.product.name}
                  ></Image>
                </Col>
                <Col md={7}>
                  <h3>{cartItem.product.name}</h3>
                  <p>{cartItem.product.description}</p>
                </Col>
              </Row>{" "}
              <Form onSubmit={handleUpdate}>
                <Row className="my-3">
                  <Row className="my-3 d-flex align-items-end">
                    <Col md={7}>
                      <Form.Group controlId="qtySmall">
                        <Form.Label>Small</Form.Label>
                        <Form.Control
                          as="input"
                          type="number"
                          min="0"
                          max="10"
                          value={qtySmall === "" ? cartItem.qtySmall : qtySmall}
                          onChange={(e) => {
                            setQtySmall(e.target.value);
                            handleSmall(e);
                          }}
                          disabled={success}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Control
                        as="input"
                        type="text"
                        disabled
                        value={
                          priceSmall === ""
                            ? `$${cartItem.priceSmall}`
                            : `$${priceSmall}`
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="my-3 d-flex align-items-end">
                    <Col md={7}>
                      <Form.Group controlId="qtyMedium">
                        <Form.Label>Medium</Form.Label>
                        <Form.Control
                          as="input"
                          type="number"
                          min="0"
                          max="10"
                          value={
                            qtyMedium === "" ? cartItem.qtyMedium : qtyMedium
                          }
                          onChange={(e) => {
                            setQtyMedium(e.target.value);
                            handleMedium(e);
                          }}
                          disabled={success}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Control
                        as="input"
                        type="text"
                        disabled
                        value={
                          priceMedium === ""
                            ? `$${cartItem.priceMedium}`
                            : `$${priceMedium}`
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="my-3 d-flex align-items-end">
                    <Col md={7}>
                      <Form.Group controlId="qtyLarge">
                        <Form.Label>Large</Form.Label>
                        <Form.Control
                          as="input"
                          type="number"
                          min="0"
                          max="10"
                          value={qtyLarge === "" ? cartItem.qtyLarge : qtyLarge}
                          onChange={(e) => {
                            setQtyLarge(e.target.value);
                            handleLarge(e);
                          }}
                          disabled={success}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Control
                        as="input"
                        type="text"
                        disabled
                        value={
                          priceLarge === ""
                            ? `$${cartItem.priceLarge}`
                            : `$${priceLarge}`
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="my-3 d-flex align-items-end">
                    <Col md={7}>
                      <Form.Group controlId="qtyXtraLarge">
                        <Form.Label>Xtra Large</Form.Label>
                        <Form.Control
                          as="input"
                          type="number"
                          min="0"
                          max="10"
                          value={
                            qtyXtraLarge === ""
                              ? cartItem.qtyXtraLarge
                              : qtyXtraLarge
                          }
                          onChange={(e) => {
                            setQtyXtraLarge(e.target.value);
                            handleXtraLarge(e);
                          }}
                          disabled={success}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Control
                        as="input"
                        type="text"
                        disabled
                        value={
                          priceXtraLarge === ""
                            ? `$${cartItem.priceXtraLarge}`
                            : `$${priceXtraLarge}`
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="my-3 d-flex align-items-end">
                    <Col md={7}>
                      <Form.Group controlId="color">
                        <Form.Label>Color</Form.Label>
                        <Form.Select
                          value={color === "" ? cartItem.color : color}
                          placeholder="Select Color"
                          required
                          disabled={success}
                          onChange={(e) => setColor(e.target.value)}
                        >
                          <option value={cartItem.color} default>
                            {cartItem.color}
                          </option>
                          <option value="black">Black </option>
                          <option value="white">White </option>
                          <option value="navy">Navy </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>
                <hr />
                <Row className="my-3 d-flex justify-content-start">
                  <Col md={7}>
                    <Button variant="primary" type="submit" disabled={success}>
                      Update Order
                    </Button>
                  </Col>
                  <Col md={3}>
                    <h4>SubTotal</h4>$
                    {`${(
                      (priceSmall === "" ? +cartItem.priceSmall : +priceSmall) +
                      (priceMedium === ""
                        ? +cartItem.priceMedium
                        : +priceMedium) +
                      (priceLarge === "" ? +cartItem.priceLarge : +priceLarge) +
                      (priceXtraLarge === ""
                        ? +cartItem.priceXtraLarge
                        : +priceXtraLarge)
                    ).toFixed(2)}`}
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
};

export default CartItemScreen;
