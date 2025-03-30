"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { axiosGet } from "@/handleApi"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"



const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function MyCategorySelect({ onChange, disabled }: any) {

    React.useEffect(() =>{
        getAllCategories()
    }, [])
    
    interface Category {
        sValue: string;
        sName: string;
    }

    const [categories, setCategories] = React.useState<Category[]>([])
    
    const getAllCategories = async () =>{
        try {
            // API call to get all categories
            const chk = await axiosGet('/api/v1/categories')
            if(chk.success) {
                setCategories(chk.data)
            }
        } catch (error) {
            toast.error('Failed to fetch categories',{
                closeButton: true,
                position: "top-right"
            })
        }
    }

  const [open, setOpen] = React.useState(false)
  const [selectedCategory, setOselectedCategory] = React.useState({
    sName: '',
    sValue: '',
    _id: ''
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={disabled}
        >
          {selectedCategory.sValue
            ? categories.find((category: any) => category.sValue === selectedCategory.sValue)?.sName
            : "Select Category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Category..." />
          <CommandList>
            <CommandEmpty>No Category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category: any) => (
                <CommandItem
                  key={category.sName}
                  value={category.sValue}
                  onSelect={() => {
                    setOselectedCategory(category)
                    onChange(category)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategory.sValue === category.sValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.sName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
