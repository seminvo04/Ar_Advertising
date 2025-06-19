import { CategorySlice, createCategorySlice } from '@/features/category/category.slice';
import { ComboSlice, createComboSlice } from '@/features/combos/combos.slice';
import { WaiterSlice, createWaiterSlice } from '@/features/waiter/waiter.slice';
import { ProductSlice, createProductSlice } from '@/features/Products/product.slice';
import { EventSlice, createEventSlice } from '@/features/event/event.slice';
import { JobsSlice, createJobsSlice } from '@/features/jobs/jobs.slice';
import { createSupplySlice, SupplySlice } from '@/features/supply/supply.slice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StoreState extends ProductSlice, CategorySlice,SupplySlice ,WaiterSlice,EventSlice,ComboSlice,JobsSlice{
  // Ajoutez d'autres slices ici
}

export const useStore = create<StoreState>()(
  devtools((...args) => ({
    ...createProductSlice(...args),
    ...createCategorySlice(...args),
    ...createSupplySlice(...args),
    ...createWaiterSlice(...args),
    ...createEventSlice(...args),
    ...createJobsSlice(...args),
    ...createComboSlice(...args),
    // Ajoutez d'autres slices ici
  }))
);