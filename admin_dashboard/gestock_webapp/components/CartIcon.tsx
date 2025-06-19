import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

const CartIcon = () => {
  const tickets = useCartStore((state) => state.tickets);
  const totalItems = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
  const router = useRouter()

  return (
    <div onClick={()=> router.push("/ticket/cart")} className="relative">
      <ShoppingCart className="w-6 h-6 text-black" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon; 