
import React, { useState, useEffect } from 'react';
import FoodCartItem from './FoodCartItem';
import { toast } from 'sonner';

interface FoodItem {
  id: string;
  name: string;
  restaurant: string;
  image: string;
  quantity: number;
  isVegetarian: boolean;
}

const FoodCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Fried Rice',
      restaurant: 'Chinese Wok',
      image: '/lovable-uploads/eb78420e-284a-4054-94b0-35596e5fae16.png',
      quantity: 1,
      isVegetarian: true
    },
    {
      id: '2',
      name: 'Fried Rice',
      restaurant: 'Chinese Wok',
      image: '/lovable-uploads/eb78420e-284a-4054-94b0-35596e5fae16.png',
      quantity: 1,
      isVegetarian: true
    },
    {
      id: '3',
      name: 'Fried Rice',
      restaurant: 'Chinese Wok',
      image: '/lovable-uploads/eb78420e-284a-4054-94b0-35596e5fae16.png',
      quantity: 1,
      isVegetarian: true
    }
  ]);

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(count);
  }, [cartItems]);

  const handleIncrement = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    
    toast.success('Item quantity increased', {
      position: 'bottom-center',
      duration: 1500,
    });
  };

  const handleDecrement = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      toast('Item quantity decreased', {
        position: 'bottom-center',
        duration: 1500,
      });
    }
  };

  const handleRemove = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    toast.error('Item removed from cart', {
      position: 'bottom-center',
      duration: 1500,
    });
  };

  const handleInitiatePoll = () => {
    toast.success('Poll initiated with your group!', {
      description: 'Your friends can now vote on the food items.',
      position: 'bottom-center',
      duration: 3000,
    });
  };

  // Animation delay for each cart item
  const getAnimationDelay = (index: number) => {
    return `${index * 0.1}s`;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden foodcart-shadow animate-fade-in">
      <div className="p-6 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-1 text-foodcart-text">Foodie cart</h2>
        <p className="text-center text-gray-500 mb-6">
          You have {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
        </p>

        <div className="space-y-3">
          {cartItems.map((item, index) => (
            <div 
              key={item.id} 
              style={{ animationDelay: getAnimationDelay(index) }}
              className="animate-slide-in"
            >
              <FoodCartItem
                id={item.id}
                name={item.name}
                restaurant={item.restaurant}
                image={item.image}
                quantity={item.quantity}
                isVegetarian={item.isVegetarian}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemove}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleInitiatePoll}
            className="animate-scale-in bg-foodcart-yellow hover:brightness-105 active:brightness-95 text-white py-3 px-8 rounded-full font-medium transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            Initiate Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
