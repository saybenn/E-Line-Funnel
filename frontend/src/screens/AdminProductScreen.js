import React, { useEffect } from "react";
import { Table, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/adminActions";
import {
  PRODUCT_LIST_RESET,
  PRODUCT_DELETE_RESET,
  PRODUCT_EDIT_RESET,
} from "../constants/adminConstants";

const AdminProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { success } = productDelete;
  const productEdit = useSelector((state) => state.productEdit);
  const { success: successEdit } = productEdit;
  useEffect(() => {
    if (!adminInfo || !adminInfo.isAdmin) {
      navigate("/");
    }
    if (!products) {
      dispatch(listProducts());
    }
    if (success || successEdit) {
      dispatch({ type: PRODUCT_LIST_RESET });
      dispatch({ type: PRODUCT_DELETE_RESET });
      dispatch({ type: PRODUCT_EDIT_RESET });
    }
  }, [dispatch, adminInfo, products, success, successEdit]);

  const createProductHandler = () => {
    dispatch(createProduct());
    dispatch({ type: PRODUCT_LIST_RESET });
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) dispatch(deleteProduct(id));
  };
  return (
    <>
      <Row className="align-items-center justify-content-between d-flex">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right d-flex justify-content-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
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
              <th>NAME</th>
              <th>BASE PRICE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.name}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminProductScreen;
