import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import FormInput from '../../components/forms/FormInput';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
  });
  
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const steps = [
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
    { key: 'confirmation', label: 'Confirmation' },
  ];
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('confirmation');
    }, 1500);
  };
  
  const handleConfirmOrder = () => {
    // In a real app, you'd submit the order to your backend
    clearCart();
    navigate('/buyer/dashboard');
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: 'shipping' | 'payment'
  ) => {
    const { name, value } = e.target;
    
    if (section === 'shipping') {
      setShippingAddress(prev => ({ ...prev, [name]: value }));
    } else {
      setPaymentDetails(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const calculateTotalWithShipping = () => {
    const subtotal = totalPrice;
    const shipping = totalPrice >= 50 ? 0 : 4.99;
    const tax = subtotal * 0.08;
    return (subtotal + shipping + tax).toFixed(2);
  };

  return (
    <div className="min-h-screen pt-20 bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-serif font-bold text-brown-900 mb-6">Checkout</h1>
        
        {/* Checkout steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.key}>
                <div 
                  className={`flex flex-col items-center ${
                    step.key === currentStep 
                      ? 'text-brown-600' 
                      : steps.findIndex(s => s.key === currentStep) > index 
                        ? 'text-green-600' 
                        : 'text-gray-400'
                  }`}
                >
                  <div 
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                      step.key === currentStep 
                        ? 'bg-brown-600 text-white' 
                        : steps.findIndex(s => s.key === currentStep) > index 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {steps.findIndex(s => s.key === currentStep) > index ? (
                      <Check size={16} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-sm mt-1">{step.label}</span>
                </div>
                
                {index < steps.length - 1 && (
                  <div 
                    className={`w-16 h-1 mx-2 ${
                      steps.findIndex(s => s.key === currentStep) > index 
                        ? 'bg-green-600' 
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main checkout form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Shipping address step */}
              {currentStep === 'shipping' && (
                <form onSubmit={handleShippingSubmit}>
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <Truck size={24} className="text-brown-600 mr-3" />
                      <h2 className="text-lg font-medium">Shipping Address</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <FormInput
                          label="Full Name"
                          name="fullName"
                          value={shippingAddress.fullName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <FormInput
                          label="Street Address"
                          name="address"
                          value={shippingAddress.address}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                        />
                      </div>
                      
                      <FormInput
                        label="City"
                        name="city"
                        value={shippingAddress.city}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                      />
                      
                      <FormInput
                        label="State / Province"
                        name="state"
                        value={shippingAddress.state}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                      />
                      
                      <FormInput
                        label="ZIP / Postal Code"
                        name="zip"
                        value={shippingAddress.zip}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                      />
                      
                      <FormInput
                        label="Country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                      />
                      
                      <div className="md:col-span-2">
                        <FormInput
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          value={shippingAddress.phone}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/cart')}
                    >
                      Back to Cart
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              )}
              
              {/* Payment step */}
              {currentStep === 'payment' && (
                <form onSubmit={handlePaymentSubmit}>
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <CreditCard size={24} className="text-brown-600 mr-3" />
                      <h2 className="text-lg font-medium">Payment Information</h2>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <Lock size={16} className="text-green-600 mr-2" />
                        <span className="text-sm text-gray-600">Your payment information is secure and encrypted</span>
                      </div>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <h3 className="font-medium mb-2">Shipping To:</h3>
                        <p className="text-gray-700">
                          {shippingAddress.fullName}<br />
                          {shippingAddress.address}<br />
                          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}<br />
                          {shippingAddress.country}
                        </p>
                        <button 
                          type="button" 
                          className="text-sm text-brown-600 mt-2"
                          onClick={() => setCurrentStep('shipping')}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <FormInput
                        label="Card Number"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => handleInputChange(e, 'payment')}
                        required
                      />
                      
                      <FormInput
                        label="Name on Card"
                        name="nameOnCard"
                        value={paymentDetails.nameOnCard}
                        onChange={(e) => handleInputChange(e, 'payment')}
                        required
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormInput
                          label="Expiry Date"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => handleInputChange(e, 'payment')}
                          required
                        />
                        
                        <FormInput
                          label="CVV"
                          name="cvv"
                          placeholder="123"
                          value={paymentDetails.cvv}
                          onChange={(e) => handleInputChange(e, 'payment')}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep('shipping')}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary" 
                      isLoading={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </form>
              )}
              
              {/* Confirmation step */}
              {currentStep === 'confirmation' && (
                <div className="p-6">
                  <div className="text-center py-8">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-medium text-gray-800 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                      Thank you, {user?.name}. Your order has been received and is being processed.
                    </p>
                    
                    <div className="border border-gray-200 rounded-lg p-4 mb-6 max-w-md mx-auto text-left">
                      <h3 className="font-medium mb-2 text-center">Order Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Order #:</span>
                          <span className="font-medium">ORD-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total:</span>
                          <span className="font-medium">${calculateTotalWithShipping()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment:</span>
                          <span>Credit Card ending in {paymentDetails.cardNumber.slice(-4)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="primary" 
                      onClick={handleConfirmOrder}
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-lg font-medium text-brown-900 mb-4">Order Summary</h2>
                
                <div className="max-h-64 overflow-y-auto mb-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex py-3 border-b border-gray-100 last:border-0">
                      <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden mr-3">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.quantity} x ${item.product.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-right">
                        ${(item.quantity * item.product.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
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
                      ${calculateTotalWithShipping()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;