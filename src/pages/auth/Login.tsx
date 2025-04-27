import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Coffee, User, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/ui/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password, role);
      
      if (success) {
        navigate(role === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 py-20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <Coffee className="h-10 w-10 text-brown-600" />
              </div>
              <h1 className="mt-4 text-2xl font-serif font-bold text-brown-900">Welcome back to BeanBazaar</h1>
              <p className="mt-2 text-gray-600">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="flex mb-6 bg-brown-50 rounded-lg p-1">
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center py-2 rounded-md transition-colors ${
                    role === 'buyer' 
                      ? 'bg-white shadow-sm text-brown-800' 
                      : 'text-gray-600 hover:text-brown-700'
                  }`}
                  onClick={() => setRole('buyer')}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Buyer
                </button>
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center py-2 rounded-md transition-colors ${
                    role === 'seller' 
                      ? 'bg-white shadow-sm text-brown-800' 
                      : 'text-gray-600 hover:text-brown-700'
                  }`}
                  onClick={() => setRole('seller')}
                >
                  <User size={18} className="mr-2" />
                  Seller
                </button>
              </div>

              <FormInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={role === 'buyer' ? 'buyer@example.com' : 'seller@example.com'}
              />

              <FormInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />

              <div className="flex items-center justify-between mt-6 mb-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-brown-600 hover:text-brown-800">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account?</span>{' '}
              <Link to="/register" className="text-brown-600 hover:text-brown-800 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;