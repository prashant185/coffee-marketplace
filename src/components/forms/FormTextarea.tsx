import React from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ 
  label, 
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
      <textarea
        id={id}
        className={`
          w-full px-3 py-2 bg-white border rounded-lg shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormTextarea;