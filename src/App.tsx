import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductDetails from './pages/ProductDetails';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import SellerDashboard from './pages/seller/SellerDashboard';
import AddProduct from './pages/seller/AddProduct';
import Cart from './pages/buyer/Cart';
import Checkout from './pages/buyer/Checkout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-cream-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route 
                  path="/buyer/dashboard" 
                  element={
                    <ProtectedRoute role="buyer">
                      <BuyerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/seller/dashboard" 
                  element={
                    <ProtectedRoute role="seller">
                      <SellerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/seller/add-product" 
                  element={
                    <ProtectedRoute role="seller">
                      <AddProduct />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute role="buyer">
                      <Cart />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute role="buyer">
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;