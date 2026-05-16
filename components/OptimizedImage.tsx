
import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className = "", containerClassName = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative h-52 overflow-hidden ${containerClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 z-0 shimmer" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
};

export default OptimizedImage;
