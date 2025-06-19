// export interface Column<T> {
//   id: string;
//   header: string;
//   accessorKey: keyof T;
//   cell?: (row: T) => React.ReactNode;
//   sortable?: boolean;
// }

// export interface FilterOption {
//   id: string;
//   label: string;
//   options: { label: string; value: string | number }[];
//   type: 'select' | 'date' | 'text' | 'number';
// }

// export interface PaginationState {
//   pageIndex: number;
//   pageSize: number;
// }

/**
 *
 * 
 */
import { ColumnDef } from '@tanstack/react-table'

export interface FilterOption {
  id: string;
  label: string;
  options: { label: string; value: string | number }[];
  type: 'select' | 'date' | 'text' | 'number';
}

export type Column<T> = ColumnDef<T>

export interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: any) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  show?: (row: any) => boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  filters?: FilterOption[];
  initialPageSize?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
  actions?: ActionButton[];  // Nouveau prop pour les actions
  isLoading?: boolean;
}