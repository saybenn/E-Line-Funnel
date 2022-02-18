import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/adminActions";

const Header = () => {
  const dispatch = useDispatch();

  const customerCreate = useSelector((state) => state.customerCreate);
  const { customer } = customerCreate;
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar className="py-2 bg-primary" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-light">E-Shop</Navbar.Brand>
          </LinkContainer>
          {adminInfo && (
            <LinkContainer to={`/admin/login`}>
              <Nav.Link onClick={logoutHandler} className="text-light">
                Logout
              </Nav.Link>
            </LinkContainer>
          )}
          {customer && (
            <LinkContainer to={`/customer/orders/${customer._id}`}>
              <Nav.Link className="text-light">Your Orders</Nav.Link>
            </LinkContainer>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
