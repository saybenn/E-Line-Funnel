import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import AdminLoginScreen from "./screens/AdminLoginScreen";
import AdminCustomerScreen from "./screens/AdminCustomerScreen";
import AdminProductScreen from "./screens/AdminProductScreen";
import AdminOrderScreen from "./screens/AdminOrderScreen";
import AdminScreen from "./screens/AdminScreen";
import FirstScreen from "./screens/FirstScreen";
import SecondScreen from "./screens/SecondScreen";
import ThirdScreen from "./screens/ThirdScreen";
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
            <Route path="/admin/products" element={<AdminProductScreen />} />
            <Route path="/admin/customers" element={<AdminCustomerScreen />} />
            <Route path="/admin/orders" element={<AdminOrderScreen />} />
            <Route path="/" element={<FirstScreen />} />
            <Route path="/first/page" element={<FirstScreen />} exact />
            <Route path="/second/page" element={<SecondScreen />} />
            <Route path="/third/page" element={<ThirdScreen />} />
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