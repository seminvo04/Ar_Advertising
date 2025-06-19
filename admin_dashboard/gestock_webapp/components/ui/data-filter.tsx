'use client';

import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Input } from './input';
import { Button } from './button';
import { FilterOption } from '@/types/data-table';

interface DataFilterProps {
  filters: FilterOption[];
  onFilterChange: (filters: Record<string, string | number | boolean | null>) => void;
}

export function DataFilter({ filters, onFilterChange }: DataFilterProps) {
  const [filterValues, setFilterValues] = useState<Record<string, string | number | boolean | null>>({});

  const debouncedFilterChange = useCallback(
    debounce((newFilters: Record<string, string | number | boolean | null>) => {
      onFilterChange(newFilters);
    }, 300),
    [onFilterChange]
  );

  const handleFilterChange = (id: string, value: string  | number | boolean | null) => {
    const newFilters = { ...filterValues, [id]: value };
    setFilterValues(newFilters);
    debouncedFilterChange(newFilters);
  };

  const resetFilters = () => {
    setFilterValues({});
    onFilterChange({});
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow">
      <div className="flex-1 flex gap-1">
      {filters.map((filter) => (
        <div key={filter.id} className="">
          {filter.type === 'select' ? (
            <Select
              value={filterValues[filter.id]?.toString() || ''}
              onValueChange={(value) => handleFilterChange(filter.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type={filter.type}
              placeholder={filter.label}
              value={filterValues[filter.id]?.toString() || ''}
              onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            />
          )}
        </div>
      ))}
      </div>
     
      <Button variant="outline" className="cursor-pointer" onClick={resetFilters}>
        Réinitialiser
      </Button>
    </div>
  );
}