export type TimeFilter = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface SalesMetric {
  total: number;
  previousPeriod: number;
  percentageChange: number;
}

export interface EventMetric {
  id: string;
  name: string;
  date: Date;
  totalSales: number;
  waiters: string[];
  location: string;
}

export interface WaiterPerformance {
  id: string;
  name: string;
  totalSales: number;
  ordersCount: number;
  averageOrderValue: number;
}

export interface DashboardData {
  sales: SalesMetric;
  productsCount: number;
  waitersCount: number;
  eventsCount: number;
  topProducts: Array<{name: string; sales: number}>;
  salesOverTime: Array<{date: Date; sales: number}>;
  events: EventMetric[];
  waiterPerformance: WaiterPerformance[];
}