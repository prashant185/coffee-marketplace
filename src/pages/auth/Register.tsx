import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Coffee, User, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/ui/Button';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(name, email, password, role);
      
      if (success) {
        navigate(role === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
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
              <h1 className="mt-4 text-2xl font-serif font-bold text-brown-900">Join BeanBazaar</h1>
              <p className="mt-2 text-gray-600">Create your account</p>
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
                  I'm a Buyer
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
                  I'm a Seller
                </button>
              </div>

              <FormInput
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
              />

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

              <FormInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
              />

              <div className="flex items-center mt-6 mb-4">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-brown-600 hover:text-brown-800">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-brown-600 hover:text-brown-800">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account?</span>{' '}
              <Link to="/login" className="text-brown-600 hover:text-brown-800 font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;