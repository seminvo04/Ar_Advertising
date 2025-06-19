'use client';

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import {  DataTableProps } from '@/types/data-table';
import { Button } from './button';
import { DataFilter } from './data-filter';
import { Skeleton } from './skeleton';

// interface DataTableProps<T> {
//   data: T[];
//   columns: Column<T>[];
//   filters?: FilterOption[];
//   initialPageSize?: number;
// }

function TableSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[200px]" />
      </div>
      <div className="rounded-md border">
        <div className="h-8 border-b bg-muted/50" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DataTable<T>({
  data,
  columns,
  filters,
  initialPageSize = 10,
  actions,
  isLoading = false,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string | number | boolean | null>>({});
  const allColumns = [
    ...columns,
    ...(actions ? [
      {
        id: 'actions',
        header: 'Actions',
        size: 100,
        cell: ({ row }: { row: { original: T } }) => (
          <div className="flex items-center gap-1 justify-end">
            {actions.map((action, index) => {
              if (action.show && !action.show(row.original)) return null;

              return (
                <Button
                  key={index}
                  variant={action.variant || 'outline'}
                  size="sm"
                  onClick={() => action.onClick(row.original)}
                  className="flex cursor-pointer items-center gap-1"
                >
                  {action.icon}
                  <span className="sr-only">{action.label}</span>
                </Button>
              );
            })}
          </div>
        ),
      },
    ] : []),
  ];


  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  });

  // Ensuite, définissez le gestionnaire de filtres
  const handleFilterChange = (newFilters: Record<string, string | number | boolean | null>) => {
    console.log('New filters:', filterValues);
    
    setFilterValues(newFilters);
    const filterString = Object.values(newFilters).filter(Boolean).join(" ");
    setGlobalFilter(filterString);
  };


  return (
    <div className="space-y-4 bg-muted/25 p-4 rounded-lg shadow-md">
      {filters && <DataFilter filters={filters} onFilterChange={handleFilterChange} />}

      {isLoading ? (
        <TableSkeleton />
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <p className="text-lg font-medium">Aucune donnée</p>
          <p className="text-sm">Aucun résultat trouvé pour votre recherche</p>
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto rounded-md border">
            <table className="w-full min-w-[640px] md:w-full table-fixed border-collapse divide-y divide-gray-200">
              <thead className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={"px-2 md:px-4 py-2 text-xs md:text-sm font-bold text-foreground uppercase tracking-wider " +( header.id === "actions" ? "text-right" : "text-left")}
                        style={{ width: header.getSize() }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-background divide-y divide-gray-200">
  {table?.getRowModel?.()?.rows?.length ? (
    table.getRowModel().rows.map((row) => (
      <tr key={row.id} className="hover:bg-muted/50">
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className="px-2 md:px-4 py-2 text-xs md:text-sm text-foreground"
          >
            <div className="truncate max-w-[150px] md:max-w-none">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={allColumns.length} className="text-center py-4 text-muted-foreground">
        Aucune ligne à afficher
      </td>
    </tr>
  )}
</tbody>

            </table>
          </div>

          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Suivant
              </Button>
            </div>
            <span className="text-sm text-gray-700">
              Page {table.getState().pagination.pageIndex + 1} sur{' '}
              {table.getPageCount()}
            </span>
          </div>
        </>
      )}
    </div>
  );

}