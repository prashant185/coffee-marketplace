import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();
  
  const handleApplyCoupon = () => {
    if (!couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    // Simulate coupon validation
    if (couponCode.toLowerCase() === 'coffee10') {
      setCouponError('Coupon applied successfully!');
    } else {
      setCouponError('Invalid coupon code');
    }
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen pt-20 bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-serif font-bold text-brown-900 mb-8">Your Shopping Cart</h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  {items.map(item => (
                    <div 
                      key={item.product.id} 
                      className="flex flex-col md:flex-row items-start md:items-center py-6 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden mr-4 mb-4 md:mb-0">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <Link 
                          to={`/product/${item.product.id}`} 
                          className="text-lg font-medium text-brown-900 hover:text-brown-700 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        
                        <div className="text-sm text-gray-500 mb-2">
                          <span>{item.product.origin}</span>
                          <span className="mx-2">•</span>
                          <span>{item.product.roastLevel}</span>
                          {item.product.isOrganic && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="text-green-600">Organic</span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button 
                              className="px-2 py-1 text-gray-600 hover:text-brown-600"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              className="px-2 py-1 text-gray-600 hover:text-brown-600"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="text-brown-900 font-medium mr-4">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                            <button 
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/')}
                    leftIcon={<ChevronLeft size={16} />}
                  >
                    Continue Shopping
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-brown-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {totalPrice >= 50 ? 'FREE' : '$4.99'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-lg font-bold text-brown-900">
                        ${(totalPrice + (totalPrice >= 50 ? 0 : 4.99) + (totalPrice * 0.08)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                      Coupon Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 focus:ring-brown-500 focus:border-brown-500"
                      />
                      <Button 
                        variant="outline" 
                        className="rounded-l-none" 
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </Button>
                    </div>
                    {couponError && (
                      <p className={`mt-1 text-sm ${couponError === 'Coupon applied successfully!' ? 'text-green-600' : 'text-red-600'}`}>
                        {couponError}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth 
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any coffee beans to your cart yet.
            </p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/')}
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;