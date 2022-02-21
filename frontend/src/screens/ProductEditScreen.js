import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getEditProduct, updateProduct } from "../actions/adminActions";
import { PRODUCT_GET_RESET } from "../constants/adminConstants";
import { useParams } from "react-router-dom";

const ProductEditScreen = () => {
  //Hooks
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lineUp, setLineUp] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Selectors
  const getProduct = useSelector((state) => state.getProduct);
  const { loading, error, product } = getProduct;
  const productEdit = useSelector((state) => state.productEdit);
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = productEdit;

  //UseEffect
  useEffect(() => {
    if (!product) {
      dispatch(getEditProduct(id));
    } else {
      setName(product.name);
      setBasePrice(product.basePrice);
      setImage(product.image);
      setLineUp(product.lineUp);
      setDescription(product.description);
    }

    if (successEdit) {
      dispatch({ type: PRODUCT_GET_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, successEdit, id, product, navigate]);

  //Handlers
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        basePrice,
        image,
        lineUp,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/admin/products" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {error && <Message variant="danger">{error}</Message>}{" "}
        {loadingEdit && <Loader />}{" "}
        {errorEdit && <Message variant="danger">{errorEdit}</Message>}
        {loading && <Loader />}
        {product && (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="basePrice">
              <Form.Label>Base Price</Form.Label>
              <Form.Control
                type="number"
                value={basePrice}
                placeholder="Enter price"
                onChange={(e) => setBasePrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                placeholder="Enter image url"
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              {/* <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File> */}
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="lineUp">
              <Form.Label>Line Up</Form.Label>
              <Form.Control
                type="text"
                value={lineUp}
                placeholder="Enter place in line up "
                onChange={(e) => setLineUp(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                placeholder="Enter description "
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default ProductEditScreen;
