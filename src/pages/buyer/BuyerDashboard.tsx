import React, { useState, useEffect } from 'react';
import { ShoppingBag, ClipboardList, Heart, Settings, User, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Order } from '../../types';
import Button from '../../components/ui/Button';
import { getMockOrders } from '../../services/orderService';

const BuyerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'favorites'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getMockOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center bg-brown-800 text-white px-6 py-4">
            <User className="h-12 w-12 rounded-full bg-white text-brown-800 p-2 mr-4" />
            <div>
              <h1 className="text-2xl font-serif font-bold">Buyer Dashboard</h1>
              <p className="text-brown-200">Welcome back, {user?.name}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
            {/* Sidebar */}
            <div className="md:col-span-1 border-r border-gray-200">
              <nav className="py-6">
                <button
                  className={`flex items-center px-6 py-3 w-full text-left ${
                    activeTab === 'orders' ? 'bg-brown-50 border-l-4 border-brown-600 text-brown-800' : 'text-gray-600 hover:bg-brown-50'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <ClipboardList size={20} className="mr-3" />
                  <span>My Orders</span>
                </button>
                <button
                  className={`flex items-center px-6 py-3 w-full text-left ${
                    activeTab === 'favorites' ? 'bg-brown-50 border-l-4 border-brown-600 text-brown-800' : 'text-gray-600 hover:bg-brown-50'
                  }`}
                  onClick={() => setActiveTab('favorites')}
                >
                  <Heart size={20} className="mr-3" />
                  <span>Favorites</span>
                </button>
                <button
                  className={`flex items-center px-6 py-3 w-full text-left ${
                    activeTab === 'profile' ? 'bg-brown-50 border-l-4 border-brown-600 text-brown-800' : 'text-gray-600 hover:bg-brown-50'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <Settings size={20} className="mr-3" />
                  <span>Profile Settings</span>
                </button>
              </nav>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-3 lg:col-span-4 p-6">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">My Orders</h2>
                  
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brown-600"></div>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map(order => (
                        <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 flex flex-wrap justify-between items-center">
                            <div>
                              <span className="text-sm text-gray-500">Order ID:</span>
                              <span className="ml-2 font-medium">{order.id}</span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Date:</span>
                              <span className="ml-2">{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Total:</span>
                              <span className="ml-2 font-medium">${order.total.toFixed(2)}</span>
                            </div>
                            <div>
                              <span 
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-medium mb-2">Items</h3>
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center">
                                  <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden mr-3">
                                    <img 
                                      src={item.imageUrl} 
                                      alt={item.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-gray-500">
                                      {item.quantity} x ${item.price.toFixed(2)}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    ${(item.quantity * item.price).toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 px-4 py-3 text-right">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                      <Package size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't placed any orders yet. Start shopping to see your orders here.
                      </p>
                      <Button 
                        variant="primary" 
                        onClick={() => window.location.href = '/'}
                      >
                        Browse Coffee Beans
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Favorite Products</h2>
                  <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                    <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No favorites yet</h3>
                    <p className="text-gray-500 mb-6">
                      Add items to your favorites while browsing to save them for later.
                    </p>
                    <Button 
                      variant="primary" 
                      onClick={() => window.location.href = '/'}
                    >
                      Browse Coffee Beans
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-4">Account Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Full Name
                          </label>
                          <input 
                            type="text" 
                            defaultValue={user?.name} 
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                          </label>
                          <input 
                            type="email" 
                            defaultValue={user?.email} 
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                          </label>
                          <input 
                            type="password" 
                            defaultValue="password" 
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700 mb-4">Shipping Address</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Address
                          </label>
                          <input 
                            type="text" 
                            placeholder="123 Coffee St" 
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              City
                            </label>
                            <input 
                              type="text" 
                              placeholder="Seattle" 
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              State
                            </label>
                            <input 
                              type="text" 
                              placeholder="WA" 
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Zip Code
                            </label>
                            <input 
                              type="text" 
                              placeholder="98101" 
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Country
                            </label>
                            <input 
                              type="text" 
                              placeholder="USA" 
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;