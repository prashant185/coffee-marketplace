import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ 
  label, 
  options, 
  error, 
  className = '', 
  ...props 
}) => {
  const id = props.id || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        className={`
          w-full px-3 py-2 bg-white border rounded-lg shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormSelect;