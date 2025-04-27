import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Coffee, ShoppingCart, User, LogOut, Search, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Coffee className="h-8 w-8 text-brown-600" />
            <span className="ml-2 text-xl font-serif font-bold text-brown-900">BeanBazaar</span>
          </Link>

          {/* Search - Desktop */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex items-center bg-white rounded-full border border-gray-300 px-4 py-2 flex-grow max-w-md mx-4"
          >
            <input
              type="text"
              placeholder="Search for coffee beans..."
              className="flex-grow outline-none text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="p-1 text-gray-500 hover:text-brown-600">
              <Search size={20} />
            </button>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'buyer' && (
                  <Link 
                    to="/cart" 
                    className="relative p-2 text-brown-800 hover:text-brown-600 transition"
                  >
                    <ShoppingCart size={22} />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-brown-800 hover:text-brown-600">
                    <User size={22} />
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link 
                      to={user?.role === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard'} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    {user?.role === 'seller' && (
                      <Link 
                        to="/seller/add-product" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Add Product
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-brown-800 hover:text-brown-600 font-medium transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-brown-600 text-white rounded-lg hover:bg-brown-700 transition shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMobileMenu} className="md:hidden p-2 text-brown-800">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <form 
            onSubmit={handleSearch} 
            className="flex items-center border-b border-gray-200 px-4 py-3"
          >
            <input
              type="text"
              placeholder="Search for coffee beans..."
              className="flex-grow outline-none text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="p-1 text-gray-500">
              <Search size={20} />
            </button>
          </form>
          <nav className="px-4 py-3 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <User size={20} className="text-brown-600" />
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-sm text-gray-500 capitalize">({user?.role})</span>
                </div>
                <Link 
                  to={user?.role === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard'} 
                  className="block py-2 text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user?.role === 'buyer' && (
                  <Link 
                    to="/cart" 
                    className="flex items-center space-x-2 py-2 text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingCart size={20} />
                    <span>Cart ({totalItems})</span>
                  </Link>
                )}
                {user?.role === 'seller' && (
                  <Link 
                    to="/seller/add-product" 
                    className="block py-2 text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Add Product
                  </Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-2 py-2 text-gray-700"
                >
                  <LogOut size={20} />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 py-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-center text-brown-800 border border-brown-600 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 text-center bg-brown-600 text-white rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;