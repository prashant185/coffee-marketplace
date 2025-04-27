import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { CoffeeProduct } from '../../types';
import Button from './Button';

interface ProductCardProps {
  product: CoffeeProduct;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-brown-100">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
        {product.isOrganic && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Organic
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-semibold text-brown-900 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center ml-2">
            <Star size={16} className="text-amber-400 fill-amber-400" />
            <span className="text-sm ml-1">{product.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <span className="px-2 py-1 bg-brown-50 rounded-full mr-2">
            {product.origin}
          </span>
          <span className="px-2 py-1 bg-brown-50 rounded-full">
            {product.roastLevel}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-brown-800 font-medium">
            ${product.price.toFixed(2)}
            <span className="text-gray-500 text-xs ml-1">/ 100g</span>
          </div>
          
          <div className="flex space-x-2">
            <Link 
              to={`/product/${product.id}`} 
              className="text-brown-600 hover:text-brown-800 transition-colors"
            >
              Details
            </Link>
            {onAddToCart && (
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart();
                }}
                rightIcon={<ShoppingBag size={16} />}
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;