import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { payOrder } from "../actions/orderActions";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const CheckoutForm = ({ clientSecret, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }

    if (success) {
      setTimeout(() => {
        navigate(`/thankyou/${id}`);
      }, 3500);
    }
  }, [stripe, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    stripe.retrievePaymentIntent(clientSecret).then(function (response) {
      if (
        response.paymentIntent &&
        response.paymentIntent.status === "succeeded"
      ) {
        console.log(response);
        setMessage("Payment Succeeded");
        setSuccess(true);
        dispatch(payOrder(id));
      } else {
        setMessage("Something went wrong");
        console.log(response);
      }
    });

    setIsLoading(false);
  };

  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
      <Form.Label as="legend">Stripe Secure Payments</Form.Label>
      <hr />
      <PaymentElement id="payment-element" />
      <Button
        className="my-3"
        variant="primary"
        disabled={isLoading || !stripe || !elements || success}
        type="submit"
      >
        Pay Here
      </Button>
      {isLoading && <Loader />}
      {message && <Message id="payment-message">{message}</Message>}
    </Form>
  );
};

export default CheckoutForm;
