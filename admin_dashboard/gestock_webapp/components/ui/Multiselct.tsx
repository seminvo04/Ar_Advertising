import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MultiSelectProps<T> {
  options: T[];
  selected: string[];
  onChange: (selected: string[]) => void;
  getOptionValue: (option: T) => string;
  getOptionLabel: (option: T) => string;
  placeholder?: string;
}

export function MultiSelect<T>({
  options,
  selected,
  onChange,
  getOptionValue,
  getOptionLabel,
  placeholder = "Sélectionner",
}: MultiSelectProps<T>) {
  const [search, setSearch] = useState("");

  const toggleSelection = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // Filtrer les options selon la recherche (case insensitive)
  const filteredOptions = options.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selected.length > 0
            ? `${selected.length} sélectionné(s)`
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 z-50">
        <Command>
          {/* Champ de recherche */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <CommandGroup>
            {filteredOptions.map((option) => {
              const value = getOptionValue(option);
              const label = getOptionLabel(option);

              return (
                <CommandItem
                  key={value}
                  onSelect={() => toggleSelection(value)}
                >
                  <div
                    className={cn(
                      "mr-2 h-4 w-4 rounded border border-primary",
                      selected.includes(value) && "bg-primary"
                    )}
                  />
                  {label}
                  {selected.includes(value) && (
                    <Check className="ml-auto h-4 w-4 text-primary" />
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
