import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { getOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  GET_ORDER_RESET,
  CUSTOMER_ORDERS_RESET,
} from "../constants/orderConstants";

const OrdersScreen = () => {
  //Hooks
  const dispatch = useDispatch();
  const { id } = useParams();

  //Selectors
  const customerOrders = useSelector((state) => state.customerOrders);
  const { orders, loading, error } = customerOrders;

  //UseEffect
  useEffect(() => {
    dispatch({ type: GET_ORDER_RESET });
    if (!orders) {
      dispatch(getOrders(id));
    }
    if (orders && id !== orders[0].customer.id) {
      dispatch({ type: CUSTOMER_ORDERS_RESET });
    }
  }, [dispatch, orders, id]);

  return (
    <>
      <h1>Order List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.slice(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <td>{order.paidAt.slice(0, 10)}</td>
                    ) : (
                      "Not Paid"
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <td>{order.deliveredAt.slice(0, 10)}</td>
                    ) : (
                      "Not Delivered"
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersScreen;
