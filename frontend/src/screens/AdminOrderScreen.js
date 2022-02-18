import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/adminActions";

const AdminOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;
  useEffect(() => {
    if (adminInfo && !adminInfo.isAdmin) {
      navigate("/");
    }
    if (!orders) {
      dispatch(listOrders);
    }
  }, [dispatch, adminInfo, orders]);
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

export default AdminOrderScreen;
