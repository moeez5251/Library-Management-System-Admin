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

const CategorySelect = ({
  options = [
    "Fiction", "Non-fiction", "Fantasy", "Science Fiction", "Mystery", "Thriller",
    "Romance", "Historical", "Biography", "Autobiography", "Self-help", "Health & Wellness",
    "Science", "Mathematics", "Technology", "Business", "Economics", "Politics", "Philosophy",
    "Psychology", "Religion", "Spirituality", "Art & Design", "Photography", "Travel", "Cooking",
    "Children's", "Young Adult", "Comics & Graphic Novels", "Education", "Poetry", "Drama", "Law",
    "Language & Grammar", "Horror", "Adventure", "Humor", "Sports", "Music", "Parenting", "True Crime",
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
          className="w-[200px] justify-between text-gray-500"
        >
          {value || 'Choose a category'}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      {!disabled && (
        <PopoverContent
          side={isMobile ? "bottom" : "left"}
          align={isMobile ? "center" : "start"}
          className="w-2xs p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
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

export default CategorySelect;
