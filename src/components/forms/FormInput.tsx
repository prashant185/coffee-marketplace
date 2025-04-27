import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  fullWidth?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  error, 
  fullWidth = true, 
  className = '', 
  ...props 
}) => {
  const id = props.id || label.toLowerCase().replace(/\s+/g, '-');
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`mb-4 ${widthClass}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        className={`
          px-3 py-2 bg-white border rounded-lg shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${widthClass}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormInput;