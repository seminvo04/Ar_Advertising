export type PaymentMethod = 'CASH' | 'MOBILE_MONEY' | 'CARD';
export type OrderStatus = 'PAID' | 'UNPAID';
export type OrderType = 'INTERNAL' | 'EVENT';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  waiterId: string;
  waiterName: string;
  createdAt: Date;
  paymentMethod?: PaymentMethod;
  paidAt?: Date;
  orderType: OrderType;
  eventName?: string;
}