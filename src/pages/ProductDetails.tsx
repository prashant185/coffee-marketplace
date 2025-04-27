import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Coffee, ShoppingBag, ChevronLeft, ChevronRight, Truck, Clock, CheckCircle as CircleCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CoffeeProduct, Review } from '../types';
import { getMockProduct, getMockReviews } from '../services/productService';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<CoffeeProduct | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const productData = await getMockProduct(id);
        const reviewsData = await getMockReviews(id);
        
        setProduct(productData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (isAuthenticated && user?.role === 'buyer') {
      addToCart(product, quantity);
    } else {
      navigate('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brown-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex flex-col justify-center items-center">
        <Coffee size={64} className="text-gray-400 mb-4" />
        <h1 className="text-2xl font-medium text-gray-700">Product not found</h1>
        <p className="text-gray-500 mb-6">The coffee bean you're looking for doesn't exist</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Browse Other Coffees
        </Button>
      </div>
    );
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen pt-20 bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-brown-600">Home</button>
          <span className="mx-2">/</span>
          <span>{product.origin}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        {/* Product main section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product images */}
            <div className="relative bg-brown-50">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover object-center" 
              />
              {product.isOrganic && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Organic
                </div>
              )}
            </div>
            
            {/* Product info */}
            <div className="p-6 md:p-8">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-brown-900 mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <Rating value={averageRating} />
                <span className="ml-2 text-gray-500">
                  {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-xl font-semibold text-brown-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  per 100g bag
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-brown-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Origin</div>
                  <div className="font-medium">{product.origin}</div>
                </div>
                <div className="bg-brown-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Roast Level</div>
                  <div className="font-medium">{product.roastLevel}</div>
                </div>
                <div className="bg-brown-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Process</div>
                  <div className="font-medium">{product.process}</div>
                </div>
                <div className="bg-brown-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Altitude</div>
                  <div className="font-medium">{product.altitude}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center text-brown-700 mb-2">
                  <CircleCheck size={18} className="text-green-500 mr-2" />
                  <span className="font-medium">In Stock</span>
                  <span className="ml-1 text-gray-500">
                    ({product.stockQuantity} available)
                  </span>
                </div>
                <div className="flex items-center text-brown-700 mb-2">
                  <Truck size={18} className="mr-2" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center text-brown-700">
                  <Clock size={18} className="mr-2" />
                  <span>Ships within 1-2 business days</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    className="px-3 py-2 text-gray-600 hover:text-brown-600"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-12 text-center border-0 focus:ring-0"
                  />
                  <button 
                    className="px-3 py-2 text-gray-600 hover:text-brown-600"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <Button 
                  variant="primary" 
                  onClick={handleAddToCart}
                  rightIcon={<ShoppingBag size={20} />}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>Seller: {product.seller}</p>
              </div>
            </div>
          </div>
          
          {/* Product tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'description' ? 'text-brown-600 border-b-2 border-brown-600' : 'text-gray-500 hover:text-brown-600'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'details' ? 'text-brown-600 border-b-2 border-brown-600' : 'text-gray-500 hover:text-brown-600'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Details & Specifications
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'reviews' ? 'text-brown-600 border-b-2 border-brown-600' : 'text-gray-500 hover:text-brown-600'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({reviews.length})
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="mb-4">
                    {product.description}
                  </p>
                  <p className="mb-4">
                    This exceptional coffee features notes of {product.flavorNotes.join(', ')}.
                    Perfect for those who appreciate a {product.roastLevel.toLowerCase()} roast
                    with a {product.acidity.toLowerCase()} acidity and {product.body.toLowerCase()} body.
                  </p>
                  <p>
                    Each batch is carefully roasted to bring out the unique characteristics
                    of these {product.origin} beans, ensuring a consistently delightful cup.
                  </p>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Coffee Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-600">Origin</td>
                            <td className="py-2 font-medium">{product.origin}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-600">Farm/Producer</td>
                            <td className="py-2 font-medium">{product.farm || 'Multiple small producers'}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-600">Altitude</td>
                            <td className="py-2 font-medium">{product.altitude}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-600">Varieties</td>
                            <td className="py-2 font-medium">{product.varieties || 'Mixed'}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-600">Process</td>
                            <td className="py-2 font-medium">{product.process}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600">Harvest Period</td>
                            <td className="py-2 font-medium">{product.harvestPeriod || 'Varies'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div>
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-600">Roast Level</td>
                            <td className="py-2 font-medium">{product.roastLevel}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-600">Acidity</td>
                            <td className="py-2 font-medium">{product.acidity}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-600">Body</td>
                            <td className="py-2 font-medium">{product.body}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-600">Flavor Notes</td>
                            <td className="py-2 font-medium">{product.flavorNotes.join(', ')}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 text-gray-600">Organic</td>
                            <td className="py-2 font-medium">{product.isOrganic ? 'Yes' : 'No'}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600">Roast Date</td>
                            <td className="py-2 font-medium">{product.roastDate || 'Roasted to order'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    {isAuthenticated && user?.role === 'buyer' && (
                      <Button variant="outline" size="sm">
                        Write a Review
                      </Button>
                    )}
                  </div>
                  
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b border-gray-200 pb-6">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-brown-100 flex items-center justify-center text-brown-700 font-bold mr-3">
                                {review.userName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{review.userName}</div>
                                <div className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <Rating value={review.rating} />
                          </div>
                          <h4 className="font-medium mb-2">{review.title}</h4>
                          <p className="text-gray-700">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No reviews yet. Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;