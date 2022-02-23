import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import AdminLoginScreen from "./screens/AdminLoginScreen";
import AdminCustomerScreen from "./screens/AdminCustomerScreen";
import AdminProductScreen from "./screens/AdminProductScreen";
import AdminOrderScreen from "./screens/AdminOrderScreen";
import AdminEmailScreen from "./screens/AdminEmailScreen";
import AdminScreen from "./screens/AdminScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import FirstScreen from "./screens/FirstScreen";
import LineUpScreen from "./screens/LineUpScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import CartItemScreen from "./screens/CartItemScreen";
import OrderScreen from "./screens/OrderScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ThankyouScreen from "./screens/ThankyouScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3 bg-light">
        <Container>
          <Routes>
            <Route path="/admin/login" element={<AdminLoginScreen />} />
            <Route path="/admin/panel" element={<AdminScreen />} />
            <Route path="/admin/email" element={<AdminEmailScreen />} />
            <Route path="/admin/products" element={<AdminProductScreen />} />
            <Route
              path="/admin/products/:id/edit"
              element={<ProductEditScreen />}
            />
            <Route path="/admin/customers" element={<AdminCustomerScreen />} />
            <Route path="/admin/orders" element={<AdminOrderScreen />} />
            <Route path="/" element={<FirstScreen />} />
            <Route path="/first/page" element={<FirstScreen />} exact />
            <Route path="/:lineup/page" element={<LineUpScreen />} />
            <Route path="/cart/:id" element={<CartItemScreen />} exact />
            <Route path="/checkout/:id" element={<CheckoutScreen />} exact />
            <Route path="/orders/:id" element={<OrderScreen />} exact />
            <Route path="/thankyou/:id" element={<ThankyouScreen />} exact />
            <Route
              path="/customer/orders/:id"
              element={<OrdersScreen />}
              exact
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Container>
      </main>
    </Router>
  );
};

export default App;
