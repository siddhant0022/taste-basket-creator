
import React from 'react';
import { Trash, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLazyLoadImage } from '@/hooks/use-image-lazy-load';

interface FoodCartItemProps {
  id: string;
  name: string;
  restaurant: string;
  image: string;
  quantity: number;
  isVegetarian: boolean;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

const FoodCartItem: React.FC<FoodCartItemProps> = ({
  id,
  name,
  restaurant,
  image,
  quantity,
  isVegetarian,
  onIncrement,
  onDecrement,
  onRemove
}) => {
  const { imageSrc, imageLoaded } = useLazyLoadImage({ src: image });

  return (
    <div className="foodcart-item bg-white rounded-xl p-4 mb-3 flex items-center justify-between gap-4 animate-slide-in">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
          <img 
            src={imageSrc} 
            alt={name} 
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse-soft"></div>
          )}
        </div>

        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-foodcart-text">{name}</h3>
            {isVegetarian && (
              <span className="veg-tag bg-[#F2FCE2] text-foodcart-green text-xs px-2 py-0.5 rounded-full border border-foodcart-green/30">
                Veg
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">By {restaurant}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="quantity-control flex h-8 items-center shadow-sm rounded-md overflow-hidden">
          <button
            onClick={() => onDecrement(id)}
            className="bg-foodcart-red text-white w-8 h-8 flex items-center justify-center transition-all hover:brightness-105 active:brightness-95"
            aria-label="Decrease quantity"
          >
            <Minus size={18} />
          </button>
          <div className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-200 bg-white">
            <span className="text-sm font-medium">{quantity}</span>
          </div>
          <button
            onClick={() => onIncrement(id)}
            className="bg-foodcart-green text-white w-8 h-8 flex items-center justify-center transition-all hover:brightness-105 active:brightness-95"
            aria-label="Increase quantity"
          >
            <Plus size={18} />
          </button>
        </div>

        <button
          onClick={() => onRemove(id)}
          className="bg-foodcart-red text-white w-8 h-8 flex items-center justify-center rounded-full transition-all hover:brightness-105 active:brightness-95"
          aria-label="Remove item"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default FoodCartItem;
