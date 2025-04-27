import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  onChange,
}) => {
  const isInteractive = !!onChange;
  
  const sizeMap = {
    sm: 14,
    md: 18,
    lg: 24,
  };
  
  const starSize = sizeMap[size];
  
  const handleClick = (index: number) => {
    if (onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={`flex ${isInteractive ? 'cursor-pointer' : ''}`}>
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          className={`transition-colors ${isInteractive ? 'hover:text-amber-500' : ''}`}
        >
          <Star
            size={starSize}
            className={`
              ${index < value 
                ? 'text-amber-400 fill-amber-400' 
                : 'text-gray-300 fill-gray-300'}
              ${isInteractive ? 'cursor-pointer' : ''}
            `}
          />
        </span>
      ))}
    </div>
  );
};

export default Rating;