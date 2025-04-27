import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, Coffee } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { CoffeeProduct } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { getMockProducts } from '../services/productService';

const Home: React.FC = () => {
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<CoffeeProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    origins: [] as string[],
    roastLevels: [] as string[],
    minPrice: '',
    maxPrice: '',
    isOrganic: false,
  });

  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();
  const location = useLocation();

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getMockProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    
    fetchProducts();
  }, []);

  // Parse search query from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  // Apply search filter whenever searchQuery changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, products]);

  // Get unique values for filter options
  const origins = [...new Set(products.map(product => product.origin))];
  const roastLevels = [...new Set(products.map(product => product.roastLevel))];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleAddToCart = (product: CoffeeProduct) => {
    if (isAuthenticated && user?.role === 'buyer') {
      addToCart(product, 1);
    } else {
      // You could redirect to login or show a notification here
      alert('Please login as a buyer to add items to cart');
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCheckboxChange = (key: string, value: string) => {
    setFilters(prev => {
      const currentValues = prev[key as keyof typeof prev] as string[];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [key]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [key]: [...currentValues, value]
        };
      }
    });
  };

  const resetFilters = () => {
    setFilters({
      origins: [],
      roastLevels: [],
      minPrice: '',
      maxPrice: '',
      isOrganic: false,
    });
    setSearchQuery('');
    setFilteredProducts(products);
  };

  const applyFilters = () => {
    let result = [...products];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.origin.toLowerCase().includes(query)
      );
    }
    
    // Apply origin filter
    if (filters.origins.length > 0) {
      result = result.filter(product => filters.origins.includes(product.origin));
    }
    
    // Apply roast level filter
    if (filters.roastLevels.length > 0) {
      result = result.filter(product => filters.roastLevels.includes(product.roastLevel));
    }
    
    // Apply price range
    if (filters.minPrice !== '') {
      result = result.filter(product => product.price >= parseFloat(filters.minPrice));
    }
    
    if (filters.maxPrice !== '') {
      result = result.filter(product => product.price <= parseFloat(filters.maxPrice));
    }
    
    // Apply organic filter
    if (filters.isOrganic) {
      result = result.filter(product => product.isOrganic);
    }
    
    setFilteredProducts(result);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero section */}
      <section className="relative bg-brown-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/6802956/pexels-photo-6802956.jpeg')"
          }}
        />
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Discover Exceptional Coffee Beans from Around the World
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Connect with artisan roasters and coffee farms to find your perfect cup.
              From farm to cup, explore premium quality beans with unique flavor profiles.
            </p>
            <form onSubmit={handleSearchSubmit} className="flex max-w-md">
              <input
                type="text"
                placeholder="Search for coffee beans..."
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-amber-500 hover:bg-amber-600 px-4 py-3 rounded-r-lg transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Products section */}
      <section className="bg-cream-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-brown-900">
              Featured Coffee Beans
            </h2>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-1 text-brown-700 hover:text-brown-900 transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter panel */}
          {isFilterOpen && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 animate-slideDown">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Origin</h3>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {origins.map(origin => (
                      <label key={origin} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.origins.includes(origin)}
                          onChange={() => handleCheckboxChange('origins', origin)}
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-brown-600 focus:ring-brown-500"
                        />
                        {origin}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Roast Level</h3>
                  <div className="space-y-1">
                    {roastLevels.map(level => (
                      <label key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.roastLevels.includes(level)}
                          onChange={() => handleCheckboxChange('roastLevels', level)}
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-brown-600 focus:ring-brown-500"
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Price Range (per 100g)</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span>$</span>
                    <input
                      type="number"
                      placeholder="Min"
                      min="0"
                      className="w-full px-3 py-2 border rounded-md"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                    <span>to</span>
                    <span>$</span>
                    <input
                      type="number"
                      placeholder="Max"
                      min="0"
                      className="w-full px-3 py-2 border rounded-md"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>
                  
                  <label className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      checked={filters.isOrganic}
                      onChange={(e) => handleFilterChange('isOrganic', e.target.checked)}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-brown-600 focus:ring-brown-500"
                    />
                    Organic Only
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Coffee size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No coffee beans found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials section */}
      <section className="bg-brown-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-brown-900 text-center mb-12">
            What Coffee Lovers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-brown-200 flex items-center justify-center text-brown-700 font-bold mr-4">
                  JD
                </div>
                <div>
                  <h4 className="font-medium">John Doe</h4>
                  <div className="flex text-amber-400">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "I've been a coffee enthusiast for years, and BeanBazaar has introduced me to beans 
                I never would have discovered otherwise. The Ethiopian Yirgacheffe from SmallBatch Roasters 
                changed my morning routine forever!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-brown-200 flex items-center justify-center text-brown-700 font-bold mr-4">
                  SR
                </div>
                <div>
                  <h4 className="font-medium">Sarah Rodriguez</h4>
                  <div className="flex text-amber-400">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "As a small café owner, finding reliable sources for quality beans is essential. 
                BeanBazaar connects me directly with farmers and roasters, ensuring I always have 
                the best selection for my customers. The ordering process is simple and delivery is always on time."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-brown-200 flex items-center justify-center text-brown-700 font-bold mr-4">
                  ML
                </div>
                <div>
                  <h4 className="font-medium">Marcus Lee</h4>
                  <div className="flex text-amber-400">
                    {Array(4).fill(0).map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "I love being able to browse such a wide variety of coffee beans all in one place. 
                The detailed descriptions of flavor profiles and origins have helped me expand my 
                palate and discover new favorites. Shipping could be faster, but the quality is worth the wait."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-amber-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            Join Our Coffee Community Today
          </h2>
          <p className="text-lg text-white opacity-90 max-w-2xl mx-auto mb-8">
            Whether you're a coffee connoisseur looking for your next favorite bean or a seller 
            wanting to reach more customers, BeanBazaar is the marketplace for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="bg-white text-amber-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/register'}
            >
              Create an Account
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-amber-600"
              onClick={() => window.location.href = '/about'}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;