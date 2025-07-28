'use client';

import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils'; 

const ComboBox = ({ options = ['5', '10', '15', '20', '25','30'], value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs sm:text-sm text-muted-foreground font-semibold text-nowrap dark:text-white">Rows per page:</span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100px] justify-between"
          >
            {value || 'Select'}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[100px] p-0">
          <Command>
            <CommandGroup className="dark:bg-[#1b2536]">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className="dark:hover:bg-[#1b2550] dark:bg-[#1b2536]"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ComboBox;
