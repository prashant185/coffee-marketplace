import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Package, DollarSign, Settings, TrendingUp, ChevronUp, ChevronDown, BarChart2, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { CoffeeProduct, OrderSummary } from '../../types';
import { getMockSellerProducts } from '../../services/productService';
import { getMockSellerOrders } from '../../services/orderService';

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await getMockSellerProducts();
        const ordersData = await getMockSellerOrders();
        
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Calculate statistics
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'Processing').length;
  const totalProducts = products.length;
  
  // Get top selling products
  const topProducts = [...products]
    .sort((a, b) => b.soldQuantity - a.soldQuantity)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-20 bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center bg-brown-800 text-white px-6 py-4">
            <Coffee className="h-12 w-12 rounded-full bg-white text-brown-800 p-2 mr-4" />
            <div>
              <h1 className="text-2xl font-serif font-bold">Seller Dashboard</h1>
              <p className="text-brown-200">Welcome back, {user?.name}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
            {/* Sidebar */}
            <div className="md:col-span-1 border-r border-gray-200">
              <nav className="py-6">
                <button
                  className={`flex items-center px-6 py-3 w-full text-left ${
                    activeTab === 'overview' ? 'bg-brown-50 border-l-4 border-brown-600 text-brown-800' : 'text-gray-600 hover:bg-brown-50'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  <TrendingUp size={20} className="mr-3" />
                  <span>Overview</span>
                </button>
                <button
                  className={`flex items-center px-6 py-3 w-full text-left ${
                    activeTab === 'products' ? 'bg-brown-50 border-l-4 border-brown-600 text-brown-800' : 'text-gray-600 hover:bg-brown-50'
                  }`}
                  onClick={() => setActiveTab('products')}
                >
                  <Coffee size={20} className="mr-3" />
                  <span>Products</span>
                </button>
                <button
                  className={`flex items-center px-6 py-3 w-full text-left ${
                    activeTab === 'orders' ? 'bg-brown-50 border-l-4 border-brown-600 text-brown-800' : 'text-gray-600 hover:bg-brown-50'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package size={20} className="mr-3" />
                  <span>Orders</span>
                </button>
                <button
                  className={`flex items-center px-6 py-3 w-full text-left ${
                    activeTab === 'settings' ? 'bg-brown-50 border-l-4 border-brown-600 text-brown-800' : 'text-gray-600 hover:bg-brown-50'
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={20} className="mr-3" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-3 lg:col-span-4 p-6">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brown-600"></div>
                </div>
              ) : (
                <>
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Dashboard Overview</h2>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Last 30 Days
                          </Button>
                          <Button variant="outline" size="sm">
                            Export
                          </Button>
                        </div>
                      </div>
                      
                      {/* Stats cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-gray-500 text-sm">Total Sales</p>
                              <h3 className="text-2xl font-bold mt-1">${totalSales.toFixed(2)}</h3>
                            </div>
                            <div className="bg-green-100 p-2 rounded-lg">
                              <DollarSign className="h-6 w-6 text-green-600" />
                            </div>
                          </div>
                          <div className="flex items-center mt-4 text-sm">
                            <span className="text-green-600 flex items-center">
                              <ChevronUp size={16} />
                              8.2%
                            </span>
                            <span className="text-gray-500 ml-2">vs last month</span>
                          </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-gray-500 text-sm">Total Orders</p>
                              <h3 className="text-2xl font-bold mt-1">{totalOrders}</h3>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Package className="h-6 w-6 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex items-center mt-4 text-sm">
                            <span className="text-red-600 flex items-center">
                              <ChevronDown size={16} />
                              3.1%
                            </span>
                            <span className="text-gray-500 ml-2">vs last month</span>
                          </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-gray-500 text-sm">Pending Orders</p>
                              <h3 className="text-2xl font-bold mt-1">{pendingOrders}</h3>
                            </div>
                            <div className="bg-amber-100 p-2 rounded-lg">
                              <Clock className="h-6 w-6 text-amber-600" />
                            </div>
                          </div>
                          <div className="flex items-center mt-4 text-sm text-gray-500">
                            Needs attention
                          </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-gray-500 text-sm">Total Products</p>
                              <h3 className="text-2xl font-bold mt-1">{totalProducts}</h3>
                            </div>
                            <div className="bg-purple-100 p-2 rounded-lg">
                              <Coffee className="h-6 w-6 text-purple-600" />
                            </div>
                          </div>
                          <div className="flex items-center mt-4 text-sm">
                            <Link to="/seller/add-product" className="text-brown-600 font-medium">
                              Add new product
                            </Link>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sales chart */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Sales Overview</h3>
                            <Button variant="outline" size="sm">
                              <BarChart2 size={16} className="mr-1" /> View Report
                            </Button>
                          </div>
                          <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Sales chart visualization would be here</p>
                          </div>
                        </div>
                        
                        {/* Top selling products */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Top Selling Products</h3>
                            <Button variant="outline" size="sm" onClick={() => setActiveTab('products')}>
                              View All
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            {topProducts.map(product => (
                              <div key={product.id} className="flex items-center">
                                <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden mr-3">
                                  <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-sm text-gray-500">{product.origin}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">${product.price.toFixed(2)}</div>
                                  <div className="text-sm text-gray-500">{product.soldQuantity} sold</div>
                                </div>
                              </div>
                            ))}
                            
                            {topProducts.length === 0 && (
                              <p className="text-gray-500 text-center py-4">No products sold yet</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Products Tab */}
                  {activeTab === 'products' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Your Products</h2>
                        <Link to="/seller/add-product">
                          <Button variant="primary" leftIcon={<Plus size={16} />}>
                            Add New Product
                          </Button>
                        </Link>
                      </div>
                      
                      {products.length > 0 ? (
                        <div className="bg-white rounded-lg border border-gray-200">
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sold
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {products.map(product => (
                                  <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="h-10 w-10 bg-gray-100 rounded-md overflow-hidden mr-3">
                                          <img 
                                            src={product.imageUrl} 
                                            alt={product.name} 
                                            className="h-full w-full object-cover"
                                          />
                                        </div>
                                        <div>
                                          <div className="font-medium text-gray-900">{product.name}</div>
                                          <div className="text-sm text-gray-500">{product.origin}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">{product.stockQuantity}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">{product.soldQuantity}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span 
                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          product.stockQuantity > 0 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                        }`}
                                      >
                                        {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <Button variant="outline" size="sm" className="mr-2">
                                        Edit
                                      </Button>
                                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                                        Delete
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                          <Coffee size={48} className="mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-700 mb-2">No products yet</h3>
                          <p className="text-gray-500 mb-6">
                            Start adding your coffee beans to sell them on our marketplace.
                          </p>
                          <Link to="/seller/add-product">
                            <Button variant="primary">
                              Add Your First Product
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Orders Tab */}
                  {activeTab === 'orders' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Order Management</h2>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Export Orders
                          </Button>
                        </div>
                      </div>
                      
                      {orders.length > 0 ? (
                        <div className="bg-white rounded-lg border border-gray-200">
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map(order => (
                                  <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">{order.customerName}</div>
                                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">{new Date(order.date).toLocaleDateString()}</div>
                                      <div className="text-sm text-gray-500">{new Date(order.date).toLocaleTimeString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">${order.total.toFixed(2)}</div>
                                      <div className="text-sm text-gray-500">{order.itemCount} items</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span 
                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-gray-100 text-gray-800'
                                        }`}
                                      >
                                        {order.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <Button variant="outline" size="sm">
                                        View Details
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                          <Package size={48} className="mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h3>
                          <p className="text-gray-500 mb-6">
                            You haven't received any orders yet. Make sure your products are listed and visible.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Settings Tab */}
                  {activeTab === 'settings' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium text-gray-700 mb-4">Profile Information</h3>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                  Business Name
                                </label>
                                <input 
                                  type="text" 
                                  defaultValue="Coffee Roasters Co." 
                                  className="w-full p-2 border border-gray-300 rounded"
                                />
                              </div>
                              <div>
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
                                  Phone Number
                                </label>
                                <input 
                                  type="tel" 
                                  defaultValue="+1 (555) 123-4567" 
                                  className="w-full p-2 border border-gray-300 rounded"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                  Business Address
                                </label>
                                <textarea 
                                  defaultValue="123 Coffee Street, Seattle, WA 98101" 
                                  className="w-full p-2 border border-gray-300 rounded"
                                  rows={3}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium text-gray-700 mb-4">Payment Information</h3>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                  Bank Account Name
                                </label>
                                <input 
                                  type="text" 
                                  defaultValue="Coffee Roasters Co." 
                                  className="w-full p-2 border border-gray-300 rounded"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                  Bank Account Number
                                </label>
                                <input 
                                  type="text" 
                                  defaultValue="XXXX-XXXX-XXXX-1234" 
                                  className="w-full p-2 border border-gray-300 rounded"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                  Tax ID / EIN
                                </label>
                                <input 
                                  type="text" 
                                  defaultValue="XX-XXXXXXX" 
                                  className="w-full p-2 border border-gray-300 rounded"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                  Payment Method
                                </label>
                                <select className="w-full p-2 border border-gray-300 rounded">
                                  <option>Direct Deposit</option>
                                  <option>PayPal</option>
                                  <option>Check</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 border-t border-gray-200 pt-6">
                          <h3 className="font-medium text-gray-700 mb-4">Notification Preferences</h3>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input type="checkbox" defaultChecked className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-gray-300 rounded" />
                              <span className="ml-2 text-gray-700">Email me when I receive a new order</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" defaultChecked className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-gray-300 rounded" />
                              <span className="ml-2 text-gray-700">Email me for payment confirmations</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" defaultChecked className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-gray-300 rounded" />
                              <span className="ml-2 text-gray-700">Email me about marketplace updates and announcements</span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex">
                          <Button variant="primary">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing component for ActiveTab === 'overview'
const Clock = (props: any) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
};

export default SellerDashboard;