import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 pt-16 px-4">
      <div className="text-center">
        <Coffee className="h-20 w-20 text-brown-400 mx-auto" />
        <h1 className="mt-6 text-6xl font-bold font-serif text-brown-900">404</h1>
        <h2 className="mt-2 text-2xl font-medium text-brown-800">Page Not Found</h2>
        <p className="mt-4 text-gray-600 max-w-md mx-auto">
          The coffee page you're looking for has been ground up or brewed away. 
          Let's get you back to browsing our delicious beans.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button variant="primary" leftIcon={<ArrowLeft size={18} />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;