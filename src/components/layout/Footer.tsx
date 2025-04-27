import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown-900 text-cream-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Coffee className="h-8 w-8 text-amber-500" />
              <span className="ml-2 text-xl font-serif font-bold">BeanBazaar</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting coffee lovers with specialty beans from around the world.
              Our marketplace brings together passionate farmers and discerning buyers.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-amber-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-amber-500 transition-colors">Coffee Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* For Buyers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Buyers</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/how-to-buy" className="hover:text-amber-500 transition-colors">How to Buy</Link>
              </li>
              <li>
                <Link to="/buyer/register" className="hover:text-amber-500 transition-colors">Create Buyer Account</Link>
              </li>
              <li>
                <Link to="/buyer-faq" className="hover:text-amber-500 transition-colors">Buyer FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-amber-500 transition-colors">Shipping Information</Link>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Sellers</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/how-to-sell" className="hover:text-amber-500 transition-colors">How to Sell</Link>
              </li>
              <li>
                <Link to="/seller/register" className="hover:text-amber-500 transition-colors">Become a Seller</Link>
              </li>
              <li>
                <Link to="/seller-faq" className="hover:text-amber-500 transition-colors">Seller FAQ</Link>
              </li>
              <li>
                <Link to="/seller-resources" className="hover:text-amber-500 transition-colors">Seller Resources</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 BeanBazaar. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="hover:text-amber-500 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;