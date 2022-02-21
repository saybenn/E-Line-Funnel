import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers } from "../actions/adminActions";

const AdminCustomerScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;
  useEffect(() => {
    if (!adminInfo || !adminInfo.isAdmin) {
      navigate("/");
    }
    if (!users) {
      dispatch(listUsers());
    }
  }, [dispatch, adminInfo, users]);
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ORDERS</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>${user.email}</td>
                  <td>
                    <LinkContainer to={`/customer/orders/${user._id}`}>
                      <Button variant="light" className="btn-sm">
                        Orders
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

export default AdminCustomerScreen;
