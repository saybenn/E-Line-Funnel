import React from "react";
import { Row, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const AdminScreen = () => {
  //Hooks
  const navigate = useNavigate();

  //Selectors
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  //UseEffect
  useEffect(() => {
    if (adminInfo && !adminInfo.isAdmin) {
      navigate("/");
    }
  }, [adminInfo, navigate]);

  return (
    <>
      <Row>
        <h1 className="my-3">Welcome to the Admin Panel</h1>
      </Row>
      <Row>
        <Link to="/admin/orders">
          <Button className="mt-3" variant="primary">
            Orders
          </Button>
        </Link>
      </Row>
      <Row>
        <Link to="/admin/customers">
          <Button className="my-3" variant="primary">
            Customers
          </Button>
        </Link>
      </Row>
      <Row>
        <Link to="/admin/email">
          <Button variant="primary">NewsLetter</Button>
        </Link>
      </Row>
      <Row>
        <Link to="/admin/products">
          <Button className="my-3" variant="primary">
            Products
          </Button>
        </Link>
      </Row>
    </>
  );
};

export default AdminScreen;
