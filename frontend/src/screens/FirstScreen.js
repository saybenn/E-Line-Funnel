import React, { useState, useEffect } from "react";
import Tippy from "@tippy.js/react";
import { useDispatch, useSelector } from "react-redux";
import {
  Nav,
  Col,
  Row,
  Form,
  Card,
  Image,
  Button,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getLineups, getProduct } from "../actions/productActions";
import { addToCart, createCustomer } from "../actions/customerActions";
import {
  GET_LINEUPS_RESET,
  GET_PRODUCT_RESET,
} from "../constants/productConstants";
import {
  ADD_TO_CART_RESET,
  GET_CART_RESET,
} from "../constants/customerConstants";

const FirstScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("US");
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

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const lineup = "first";
  const dispatch = useDispatch();

  const productGet = useSelector((state) => state.productGet);
  const { product, loading: productLoading, error: productError } = productGet;
  const lineupGet = useSelector((state) => state.lineupGet);
  const { lineups, loading: lineupLoading, error: lineupError } = lineupGet;
  const customerCreate = useSelector((state) => state.customerCreate);
  const {
    customer,
    loading: customerLoading,
    error: customerError,
  } = customerCreate;
  const cartAdd = useSelector((state) => state.cartAdd);
  const {
    success: cartSuccess,
    loading: cartLoading,
    error: cartError,
  } = cartAdd;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const stepOneHandler = () => {
    setStep1(true);
    setStep2(false);
    setStep3(false);
  };
  const stepTwoHandler = () => {
    setStep1(false);
    setStep2(true);
    setStep3(false);
  };
  const stepThreeHandler = () => {
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
    if (!customer) {
      dispatch(
        createCustomer(name, email, address, city, state, postalCode, country)
      );
    }

    setStep1(false);
    setStep2(false);
    setStep3(true);
  };

  useEffect(() => {
    if (!lineups) {
      dispatch(getLineups(lineup));
    }
    if (!product) {
      dispatch(getProduct(lineup));
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
  }, [product, lineups, lineup, dispatch]);

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

  const handleCheckout = () => {
    dispatch({ type: ADD_TO_CART_RESET });

    dispatch({ type: GET_PRODUCT_RESET });

    dispatch({ type: GET_CART_RESET });
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
    setStep1(false);
    setStep2(true);
    setStep3(false);
  };

  return (
    <>
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
      {product ? (
        <Row className="d-flex justify-content-between">
          <Col md={5}>
            {product.description}
            <Image className="my-3" fluid src={product.image}></Image>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Nav className="d-flex justify-content-between mb-3">
                  {step1 ? (
                    <Nav.Item>
                      <Button onClick={stepOneHandler} variant="primary">
                        Shipping
                      </Button>
                    </Nav.Item>
                  ) : (
                    <Nav.Item>
                      <Button
                        onClick={stepOneHandler}
                        variant={
                          cartSuccess ? "outline-dark" : "outline-secondary"
                        }
                        disabled={cartSuccess}
                      >
                        Shipping
                      </Button>
                    </Nav.Item>
                  )}{" "}
                  {step2 ? (
                    <Nav.Item>
                      <Button
                        onClick={stepTwoHandler}
                        variant="primary"
                        disabled={cartSuccess}
                      >
                        Items
                      </Button>
                    </Nav.Item>
                  ) : (
                    <Nav.Item>
                      <Button
                        onClick={stepTwoHandler}
                        variant={
                          cartSuccess ? "outline-dark" : "outline-secondary"
                        }
                        disabled={cartSuccess}
                      >
                        Items
                      </Button>
                    </Nav.Item>
                  )}{" "}
                  {step3 ? (
                    <Nav.Item>
                      <Button
                        onClick={stepThreeHandler}
                        variant="outline-primary"
                        disabled={cartSuccess}
                      >
                        Add To Order
                      </Button>
                    </Nav.Item>
                  ) : (
                    <Nav.Item>
                      <Button
                        onClick={stepThreeHandler}
                        variant={
                          cartSuccess ? "outline-dark" : "outline-secondary"
                        }
                        disabled={cartSuccess}
                      >
                        Add To Order
                      </Button>
                    </Nav.Item>
                  )}{" "}
                </Nav>
                {step1 && (
                  <Form>
                    {customer && (
                      <Message variant="info">
                        Already registered, skip to Step 2.
                      </Message>
                    )}
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="name">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                            disabled={customer}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={customer}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        value={address}
                        placeholder="Enter address"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={customer}
                      ></Form.Control>
                    </Form.Group>
                    <Row>
                      <Col md={7}>
                        <Form.Group controlId="city">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            value={city}
                            placeholder="Enter city"
                            required
                            onChange={(e) => setCity(e.target.value)}
                            disabled={customer}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={5}>
                        {" "}
                        <Form.Group controlId="state">
                          <Form.Label>State</Form.Label>
                          <Form.Select
                            value={state}
                            placeholder="Enter state"
                            required
                            onChange={(e) => setState(e.target.value)}
                            disabled={customer}
                          >
                            <option value="" default>
                              Select State
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
                    </Row>
                    <Form.Group controlId="postalCode">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        value={postalCode}
                        placeholder="Enter postal code"
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                        disabled={customer}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        value={country}
                        placeholder="Enter country"
                        required
                        disabled={customer}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="US">United States</option>
                      </Form.Select>
                    </Form.Group>
                    <Button
                      className="my-3 w-100"
                      onClick={stepTwoHandler}
                      variant="primary"
                    >
                      Step Two
                    </Button>
                    <Button
                      className=" hover-outline-dark"
                      variant="outline-dark "
                      onClick={handleShow}
                    >
                      See More Deals
                    </Button>
                  </Form>
                )}
                {step2 && (
                  <Form>
                    {message && <Message variant="info">{message}</Message>}
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
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
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
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
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
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
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
                            onChange={(e) => {
                              setQtyXtraLarge(e.target.value);
                              handleXtraLarge(e);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
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
                            value={!color ? "" : color}
                            placeholder="Select Color"
                            required
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
                      <Col md={4}>
                        <Tippy
                          content={`If you'd like to order more of this product in another color, please proceed to Step Three and select 'Revisit This Product' after adding your first selections to your Cart, also in Step Three.`}
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
                      <Col md={5}>
                        <h5>SubTotal</h5>$
                        {(
                          priceSmall +
                          priceMedium +
                          priceLarge +
                          priceXtraLarge
                        ).toFixed(2)}
                      </Col>
                    </Row>
                    <Row className="p-3">
                      {" "}
                      <Button onClick={stepThreeHandler} variant="primary">
                        Step Three
                      </Button>
                      <Button
                        className="my-3"
                        onClick={stepOneHandler}
                        variant="outline-secondary"
                      >
                        Back To Step One
                      </Button>
                      <Button
                        className=" hover-outline-dark"
                        variant="outline-dark "
                        onClick={handleShow}
                      >
                        See More Deals
                      </Button>
                    </Row>
                  </Form>
                )}

                {step3 && customer && !cartSuccess ? (
                  <Row className="p-3">
                    {customerError && (
                      <Message variant="danger">{customerError}</Message>
                    )}{" "}
                    {cartError && (
                      <Message variant="danger">{cartError}</Message>
                    )}
                    <Button
                      onClick={handleCart}
                      variant="primary"
                      disabled={customerError}
                    >
                      Add Items to Cart
                    </Button>
                    <Button
                      className="my-3 hover-outline-dark"
                      variant="outline-dark "
                      onClick={handleShow}
                    >
                      See More Deals
                    </Button>
                    <Button
                      onClick={stepTwoHandler}
                      variant="outline-secondary"
                    >
                      Back To Step Two
                    </Button>
                  </Row>
                ) : (
                  customerLoading && <Loader />
                )}
                {step3 && cartSuccess ? (
                  <Row className="p-3">
                    <Message variant="success">
                      Items Were Added to Your Cart
                    </Message>
                    <Button variant="primary" onClick={handleCheckout}>
                      <Link to={`/checkout/${customer._id}`}>
                        Proceed To Checkout
                      </Link>
                    </Button>
                    <Button
                      className="my-3"
                      variant="primary
                     "
                      onClick={handleRevisit}
                    >
                      <Link className="links" to={`/${lineup}/page`}>
                        {" "}
                        Revisit This Product
                      </Link>
                    </Button>
                    <Button
                      className=" hover-outline-dark"
                      variant="outline-dark "
                      onClick={handleShow}
                    >
                      See More Deals
                    </Button>
                  </Row>
                ) : (
                  cartLoading && <Loader />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : productLoading ? (
        <Loader />
      ) : (
        productError && (
          <Message varaint="danger">
            Unexpected error. We suggest reloading the page.
          </Message>
        )
      )}
    </>
  );
};

export default FirstScreen;
