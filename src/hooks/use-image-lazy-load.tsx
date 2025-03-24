
import { useState, useEffect } from 'react';

interface UseLazyLoadImageProps {
  src: string;
  placeholderSrc?: string;
}

export function useLazyLoadImage({ 
  src, 
  placeholderSrc = '/placeholder.svg' 
}: UseLazyLoadImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
    
    return () => {
      img.onload = null;
    };
  }, [src]);

  return { imageSrc, imageLoaded };
}
