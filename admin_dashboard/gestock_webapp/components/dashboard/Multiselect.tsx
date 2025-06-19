import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  
  import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
  import { Check, ChevronsUpDown } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
import { Waiter } from "@/features/waiter/waiter.type";
  
  
  interface MultiSelectProps {
    options: Waiter[];
    selected: string[];
    onChange: (selected: string[]) => void;
  }
  
  export function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
    const toggleSelection = (id: string) => {
      if (selected.includes(id)) {
        onChange(selected.filter((item) => item !== id));
      } else {
        onChange([...selected, id]);
      }
    };
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selected.length > 0
              ? `${selected.length} marchand(s) sélectionné(s)`
              : "Sélectionner les marchands"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandGroup>
              {options.map((waiter) => (
                <CommandItem
                  key={waiter.id}
                  onSelect={() => toggleSelection(waiter.id)}
                >
                  <div
                    className={cn(
                      "mr-2 h-4 w-4 rounded border border-primary",
                      selected.includes(waiter.id) && "bg-primary"
                    )}
                  />
                  {waiter.first_name} {waiter.last_name}
                  {selected.includes(waiter.id) && (
                    <Check className="ml-auto h-4 w-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }