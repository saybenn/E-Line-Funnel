import React, { useState, useEffect } from "react";
import Tippy from "@tippy.js/react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Col, Row, Form, Card, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getLineups, getProduct } from "../actions/productActions";
import { addToCart } from "../actions/customerActions";
import {
  GET_LINEUPS_RESET,
  GET_PRODUCT_RESET,
} from "../constants/productConstants";
import {
  ADD_TO_CART_RESET,
  GET_CART_RESET,
} from "../constants/customerConstants";

const SecondScreen = () => {
  const [qtySmall, setQtySmall] = useState(0);
  const [priceSmall, setPriceSmall] = useState(0);
  const [qtyMedium, setQtyMedium] = useState(0);
  const [priceMedium, setPriceMedium] = useState(0);
  const [qtyLarge, setQtyLarge] = useState(0);
  const [priceLarge, setPriceLarge] = useState(0);
  const [qtyXtraLarge, setQtyXtraLarge] = useState(0);
  const [priceXtraLarge, setPriceXtraLarge] = useState(0);
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const lineup = "second";
  const dispatch = useDispatch();

  const lineupGet = useSelector((state) => state.lineupGet);
  const { lineups, loading: lineupLoading, error: lineupError } = lineupGet;
  const productGet = useSelector((state) => state.productGet);
  const { product, loading: productLoading, error: productError } = productGet;
  const customerCreate = useSelector((state) => state.customerCreate);
  const { customer } = customerCreate;
  const cartAdd = useSelector((state) => state.cartAdd);
  const { success: cartSuccess, error: cartError } = cartAdd;

  useEffect(() => {
    if (!product) {
      dispatch(getProduct(lineup));
    }
    if (!lineups) {
      dispatch(getLineups(lineup));
    }
    if (product && product.lineUp.toLowerCase() !== lineup.toLowerCase()) {
      console.log(21212);
      dispatch({ type: GET_PRODUCT_RESET });
    }
    if (lineups && product) {
      let check = lineups.filter((l) => {
        return l._id === product._id;
      });
      if (check.length > 0) {
        dispatch({ type: GET_LINEUPS_RESET });
        dispatch({ type: ADD_TO_CART_RESET });
      }
    }
  }, [product, lineups, dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleCart = () => {
    if (color === null) {
      setMessage("Please Select A Color");
      setTimeout(() => {
        setMessage(false);
      }, 3500);
      return;
    }
    if (
      qtySmall === 0 &&
      qtyMedium === 0 &&
      qtyLarge === 0 &&
      qtyXtraLarge === 0
    ) {
      setMessage("Please Select A Size");
      setTimeout(() => {
        setMessage(false);
      }, 3500);
      return;
    }
    dispatch(
      addToCart(
        product,
        qtySmall,
        qtyMedium,
        qtyLarge,
        qtyXtraLarge,
        color,
        customer._id
      )
    );
  };

  const handleRevisit = () => {
    dispatch({ type: ADD_TO_CART_RESET });
    setQtySmall(0);
    setQtyMedium(0);
    setQtyLarge(0);
    setQtyXtraLarge(0);
    setPriceSmall(0);
    setPriceMedium(0);
    setPriceLarge(0);
    setPriceXtraLarge(0);
    setColor(null);
  };

  const handleCheckout = () => {
    dispatch({ type: ADD_TO_CART_RESET });

    dispatch({ type: GET_PRODUCT_RESET });
    dispatch({ type: GET_CART_RESET });
  };

  return (
    <>
      {productError && <Message variant="danger">{productError}</Message>}

      {productLoading && <Loader />}
      {lineups && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Our Other Deals</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {lineups.map((l) => {
                return (
                  <Col>
                    <Link to={`/${l.lineUp}/page`}>
                      <Card key={l._id}>
                        <Card.Img variant="top" src={l.image} />
                        <Card.Body>
                          <Card.Title>{l.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Modal.Body>
        </Modal>
      )}
      {product && (
        <Row className="d-flex justify-content-between my-3">
          <Col md={5}>
            <Image fluid src={product.image}></Image>
          </Col>
          <Col md={6}>{product.description}</Col>{" "}
        </Row>
      )}
      <Row className="my-3">
        {" "}
        <Card>
          <Card.Body>
            <Form className="p-3">
              <Form.Label as="legend">Quantity</Form.Label>
              <Row className="my-3 d-flex align-items-end">
                <Col md={7}>
                  <Form.Group controlId="qtySmall">
                    <Form.Label>Small</Form.Label>
                    <Form.Control
                      as="input"
                      type="number"
                      min="0"
                      max="10"
                      value={qtySmall}
                      onChange={(e) => {
                        setQtySmall(e.target.value);
                        handleSmall(e);
                      }}
                      disabled={cartSuccess}
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Control
                    as="input"
                    type="text"
                    disabled
                    value={`$${priceSmall}`}
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
                      value={qtyMedium}
                      onChange={(e) => {
                        setQtyMedium(e.target.value);
                        handleMedium(e);
                      }}
                      disabled={cartSuccess}
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Control
                    as="input"
                    type="text"
                    disabled
                    value={`$${priceMedium}`}
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
                      value={qtyLarge}
                      onChange={(e) => {
                        setQtyLarge(e.target.value);
                        handleLarge(e);
                      }}
                      disabled={cartSuccess}
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Control
                    as="input"
                    type="text"
                    disabled
                    value={`$${priceLarge}`}
                  />
                </Col>
              </Row>
              <Row className="my-3 d-flex align-items-end">
                <Col md={7}>
                  <Form.Group controlId="qtyXtraLarge">
                    <Form.Label>Xtra-Large</Form.Label>
                    <Form.Control
                      as="input"
                      type="number"
                      min="0"
                      max="10"
                      value={qtyXtraLarge}
                      disabled={cartSuccess}
                      onChange={(e) => {
                        setQtyXtraLarge(e.target.value);
                        handleXtraLarge(e);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Control
                    as="input"
                    type="text"
                    disabled
                    value={`$${priceXtraLarge}`}
                  />
                </Col>
              </Row>
              <Row className="my-3 d-flex align-items-end">
                <Col md={7}>
                  <Form.Group controlId="qtyXtraLarge">
                    <Form.Label>Color</Form.Label>
                    <Form.Select
                      value={color}
                      placeholder="Select Color"
                      required
                      disabled={cartSuccess}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <option value="null" default>
                        Select Color{" "}
                      </option>
                      <option value="black">Black </option>
                      <option value="white">White </option>
                      <option value="navy">Navy </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Tippy
                    content={`If you'd like to order more of this product in another color, please select 'Revisit This Product' after adding your first selections to your Cart.`}
                    placement="top"
                    arrow={false}
                    delay={300}
                  >
                    <i className="fas fa-info-circle mx-1"></i>
                  </Tippy>
                </Col>
              </Row>
              <hr />
              <Row className="d-flex justify-content-end">
                <Col md={3}>
                  <h5>SubTotal</h5>
                </Col>
                <Col md={2}>
                  $
                  {(
                    priceSmall +
                    priceMedium +
                    priceLarge +
                    priceXtraLarge
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="p-3">
                {message && <Message variant="info">{message}</Message>}
                {cartError && (
                  <Message variant="danger">{cartError}</Message>
                )}{" "}
                {cartSuccess && (
                  <Message variant="success">
                    Item has been added to your cart.
                  </Message>
                )}
                {!cartSuccess && (
                  <Button variant="primary" onClick={handleCart}>
                    Add To Cart
                  </Button>
                )}{" "}
                {cartSuccess && (
                  <Link className="links" to={`/${lineup}/page`}>
                    <Button
                      variant="primary
                     "
                      onClick={handleRevisit}
                    >
                      Revisit This Product
                    </Button>
                  </Link>
                )}{" "}
                <Link className="links" to={`/checkout/${customer._id}`}>
                  {" "}
                  <Button
                    className="my-3"
                    variant="primary"
                    onClick={handleCheckout}
                  >
                    Proceed To Checkout{" "}
                  </Button>{" "}
                </Link>
                <Button
                  className=" hover-outline-dark"
                  variant="outline-dark "
                  onClick={handleShow}
                >
                  See More Deals
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default SecondScreen;
