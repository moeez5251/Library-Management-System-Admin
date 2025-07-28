'use client';

import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts'
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

const Language = ({
  options = [
    "English", "Urdu", "Arabic", "Spanish", "French", "German", "Chinese", "Japanese", "Korean",
    "Hindi", "Russian", "Portuguese", "Italian", "Turkish", "Bengali", "Punjabi", "Persian", "Greek",
    "Swahili", "Thai"
  ],
  value,
  onChange,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 500px)")
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-[180px] justify-between"
        >
          {value || 'Choose a Language'}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      {!disabled && (
        <PopoverContent
          side={isMobile ? "bottom" : "left"}
          align={isMobile ? "center" : "start"}
          className="w-2xs p-0">
          <Command className="dark:bg-[#1b2536]">
            <CommandInput placeholder="Search Language..." />
            <CommandEmpty>No Language found.</CommandEmpty>
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
      )}
    </Popover>
  );
};

export default Language;
