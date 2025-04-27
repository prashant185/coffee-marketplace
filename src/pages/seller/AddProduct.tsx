import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Upload, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import FormInput from '../../components/forms/FormInput';
import FormTextarea from '../../components/forms/FormTextarea';
import FormSelect from '../../components/forms/FormSelect';

const roastLevelOptions = [
  { value: 'Light', label: 'Light' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Medium-Dark', label: 'Medium-Dark' },
  { value: 'Dark', label: 'Dark' },
];

const originOptions = [
  { value: 'Ethiopia', label: 'Ethiopia' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Guatemala', label: 'Guatemala' },
  { value: 'Costa Rica', label: 'Costa Rica' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Honduras', label: 'Honduras' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Vietnam', label: 'Vietnam' },
  { value: 'Other', label: 'Other (specify in description)' },
];

const processOptions = [
  { value: 'Washed', label: 'Washed' },
  { value: 'Natural', label: 'Natural' },
  { value: 'Honey', label: 'Honey' },
  { value: 'Anaerobic', label: 'Anaerobic' },
  { value: 'Other', label: 'Other (specify in description)' },
];

const acidityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const bodyOptions = [
  { value: 'Light', label: 'Light' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Full', label: 'Full' },
];

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: '',
    origin: '',
    description: '',
    price: '',
    stockQuantity: '',
    roastLevel: '',
    process: '',
    isOrganic: false,
    acidity: '',
    body: '',
    flavorNotes: '',
    altitude: '',
    imageUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real application, you would upload the file to a server/storage
    // For this demo, we'll use a local URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
        setProduct(prev => ({ ...prev, imageUrl: 'https://images.pexels.com/photos/4820769/pexels-photo-4820769.jpeg' }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, you would submit the form data to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/seller/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center bg-brown-800 text-white px-6 py-4">
            <Coffee className="h-12 w-12 rounded-full bg-white text-brown-800 p-2 mr-4" />
            <div>
              <h1 className="text-2xl font-serif font-bold">Add New Product</h1>
              <p className="text-brown-200">List your coffee beans for sale</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Product Information */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-brown-900 mb-4">Basic Information</h2>
                  <div className="space-y-4">
                    <FormInput
                      label="Product Name"
                      name="name"
                      value={product.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Ethiopian Yirgacheffe Single Origin"
                      required
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormSelect
                        label="Origin"
                        name="origin"
                        options={originOptions}
                        value={product.origin}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <FormInput
                        label="Altitude"
                        name="altitude"
                        value={product.altitude}
                        onChange={handleInputChange}
                        placeholder="e.g., 1,800 - 2,200 MASL"
                      />
                    </div>
                    
                    <FormTextarea
                      label="Product Description"
                      name="description"
                      value={product.description}
                      onChange={handleInputChange}
                      placeholder="Describe your coffee beans, including tasting notes, farm information, etc."
                      required
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Price per 100g (in $)"
                        name="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <FormInput
                        label="Available Stock (in 100g bags)"
                        name="stockQuantity"
                        type="number"
                        min="1"
                        value={product.stockQuantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-brown-900 mb-4">Coffee Specifications</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormSelect
                        label="Roast Level"
                        name="roastLevel"
                        options={roastLevelOptions}
                        value={product.roastLevel}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <FormSelect
                        label="Process Method"
                        name="process"
                        options={processOptions}
                        value={product.process}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Organic Certification
                        </label>
                        <div className="mt-2">
                          <label className="inline-flex items-center">
                            <input 
                              type="checkbox" 
                              name="isOrganic"
                              checked={product.isOrganic}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-gray-700">Certified Organic</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormSelect
                        label="Acidity"
                        name="acidity"
                        options={acidityOptions}
                        value={product.acidity}
                        onChange={handleInputChange}
                      />
                      
                      <FormSelect
                        label="Body"
                        name="body"
                        options={bodyOptions}
                        value={product.body}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <FormInput
                      label="Flavor Notes (comma separated)"
                      name="flavorNotes"
                      value={product.flavorNotes}
                      onChange={handleInputChange}
                      placeholder="e.g., Citrus, Floral, Caramel, Chocolate"
                    />
                  </div>
                </div>
              </div>
              
              {/* Image Upload and Preview */}
              <div className="lg:col-span-1">
                <h2 className="text-lg font-medium text-brown-900 mb-4">Product Image</h2>
                <div className="bg-gray-50 border border-gray-300 border-dashed rounded-lg p-4">
                  <div className="text-center">
                    {imagePreview ? (
                      <div className="mb-4">
                        <img 
                          src={imagePreview} 
                          alt="Product preview" 
                          className="mx-auto h-64 w-full object-cover rounded-lg" 
                        />
                        <button 
                          type="button" 
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                          onClick={() => {
                            setImagePreview('');
                            setProduct(prev => ({ ...prev, imageUrl: '' }));
                          }}
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="p-6 flex flex-col items-center">
                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-4">
                          Drag and drop your image here, or click to browse
                        </p>
                        <label className="cursor-pointer bg-brown-600 hover:bg-brown-700 text-white px-4 py-2 rounded-lg transition-colors">
                          <span>Choose Image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={handleImageChange} 
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    <p>Recommended image size: 1000x1000px</p>
                    <p>Maximum file size: 5MB</p>
                    <p>Supported formats: JPG, PNG</p>
                  </div>
                </div>
                
                <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="flex">
                    <AlertCircle className="text-amber-600 mr-3 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <h3 className="font-medium">Tips for selling coffee</h3>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Use high-quality, well-lit photos</li>
                        <li>Be specific about flavor notes</li>
                        <li>Include details about the origin and farm</li>
                        <li>Mention the roast date if applicable</li>
                        <li>Be transparent about pricing and shipping</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/seller/dashboard')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;