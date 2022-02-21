import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/adminActions";
import { ORDER_LIST_RESET } from "../constants/adminConstants";

const AdminOrderScreen = () => {
  //Hooks
  const [hidePaid, setHidePaid] = useState("");
  const [hideDelivered, setHideDelivered] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Selectors
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  //UseEffect
  useEffect(() => {
    if (!adminInfo || !adminInfo.isAdmin) {
      navigate("/");
    }
    if (!orders) {
      dispatch(listOrders());
    }
  }, [dispatch, adminInfo, orders, navigate]);

  //Handlers
  const handleHidePaid = () => {
    if (hidePaid === "") {
      setHidePaid(true);
    }
    if (hidePaid === true) {
      setHidePaid(false);
    }
    if (hidePaid === false) {
      setHidePaid("");
    }
    dispatch({ type: ORDER_LIST_RESET });
  };

  const handleHideDelivered = () => {
    if (hideDelivered === "") {
      setHideDelivered(true);
    }
    if (hideDelivered === true) {
      setHideDelivered(false);
    }
    if (hideDelivered === false) {
      setHideDelivered("");
    }
    dispatch({ type: ORDER_LIST_RESET });
  };

  return (
    <>
      <Row className="align-items-center justify-content-between d-flex">
        <Col md={5}>
          <h1>Order List</h1>
        </Col>
        <Col md={3} className=" d-flex justify-content-end">
          <Button className="my-3" onClick={handleHidePaid}>
            <i class="fa-solid fa-dollar-sign"></i>{" "}
            {hidePaid === ""
              ? "Hide Paid Orders"
              : hidePaid === true
              ? "Show Paid Orders"
              : "Show Both"}
          </Button>
        </Col>
        <Col
          md={4}
          className=" d-flex justify-content-end"
          onClick={handleHideDelivered}
        >
          <Button className="my-3">
            <i class="fa-solid fa-envelope"></i>{" "}
            {hideDelivered === ""
              ? "Hide Delivered Orders"
              : hideDelivered === true
              ? "Show Delivered Orders"
              : "Show Both"}
          </Button>
        </Col>
      </Row>
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
              orders
                .filter((o) => {
                  return o.isPaid !== hidePaid;
                })
                .filter((ord) => {
                  return ord.isDelivered !== hideDelivered;
                })
                .map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.slice(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    {order.isPaid ? (
                      <td>
                        <i
                          class="fa-solid fa-check"
                          style={{ color: "green" }}
                        ></i>
                        {order.paidAt.slice(0, 10)}
                      </td>
                    ) : (
                      <td>
                        <i
                          class="fa-solid fa-xmark"
                          style={{ color: "red" }}
                        ></i>
                        Not Paid
                      </td>
                    )}
                    {order.isDelivered ? (
                      <td>
                        <i
                          class="fa-solid fa-check"
                          style={{ color: "green" }}
                        ></i>
                        {order.deliveredAt.slice(0, 10)}
                      </td>
                    ) : (
                      <td>
                        <i
                          class="fa-solid fa-xmark"
                          style={{ color: "red" }}
                        ></i>
                        Not Delivered
                      </td>
                    )}
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

export default AdminOrderScreen;
