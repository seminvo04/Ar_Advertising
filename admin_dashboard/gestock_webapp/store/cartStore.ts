import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Ticket {
  id: string;
  type: string;
  price: number;
  quantity: number;
  combo?: Combo;
}

export interface Combo {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface CartStore {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  removeTicket: (ticketId: string) => void;
  updateTicketQuantity: (ticketId: string, quantity: number) => void;
  addComboToTicket: (ticketId: string, combo: Combo) => void;
  removeComboFromTicket: (ticketId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      tickets: [],
      
      addTicket: (ticket) => set((state) => ({
        tickets: [...state.tickets, ticket]
      })),
      
      removeTicket: (ticketId) => set((state) => ({
        tickets: state.tickets.filter(ticket => ticket.id !== ticketId)
      })),
      
      updateTicketQuantity: (ticketId, quantity) => set((state) => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, quantity } : ticket
        )
      })),
      
      addComboToTicket: (ticketId, combo) => set((state) => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, combo } : ticket
        )
      })),
      
      removeComboFromTicket: (ticketId) => set((state) => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, combo: undefined } : ticket
        )
      })),
      
      clearCart: () => set({ tickets: [] }),
      
      getTotal: () => {
        const state = get();
        return state.tickets.reduce((total, ticket) => {
          const ticketTotal = ticket.price * ticket.quantity;
     
          return total + ticketTotal ;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
); 