
import { useEffect } from 'react';
import FoodCart from '@/components/FoodCart';

const Index = () => {
  // Adding a smooth fade-in effect for the entire page
  useEffect(() => {
    document.body.classList.add('bg-gray-50');
    return () => {
      document.body.classList.remove('bg-gray-50');
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <FoodCart />
      </div>
    </div>
  );
};

export default Index;
