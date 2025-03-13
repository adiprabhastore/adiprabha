"use client";
import { auth } from "@/db/firebase";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, ShoppingBag, Search, Logs } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { adminEmail } from "@/data/siteData";


const Header = ({ search, setSearch, type, setType }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    if (loading) {
        return <p>Loading...</p>; // Simple loading message or spinner
    }

   const handleSearch = () => {
     console.log("search changed", searchValue);
     const searchType = type || "ISBN";

     router.push(`/backend/search?type=${searchType}&query=${searchValue}`);
   };

    return (
        <header className="w-full mx-auto px-1">
            {/* Logo */}
            <div className="flex   items-center justify-between py-2 md:p-2">
                {/* Search Bar */}
                <div className="hidden md:flex  mx-auto items-center rounded-full w-1/2 border-gray-500 border-[1px]">
                    <div className="flex">
                        <ComboboxDemo type={type} setType={setType} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by book name or ISBN"
                        className="flex-grow ml-5 px-4 py-2 focus:outline-none tracking-wider text-gray-700"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    <button className="pr-4" onClick={handleSearch}>
                        <Search className="text-gray-700" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

const frameworks = [
    {
        type: "BOOKS",
        label: "BOOKS",
    },

    {
        type: "ISBN",
        label: "ISBN",
    },
];

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

function ComboboxDemo({ type, setType }) {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="m-0 h-full justify-between bg-transparent rounded-l-full"
                >
                    {type
                        ? frameworks.find(
                              (framework) => framework.type === type
                          )?.label
                        : "Select..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" w-[200px] p-0 ">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.type}
                                    type={framework.type}
                                    onSelect={(currentValue) => {
                                        setType(
                                            currentValue === type
                                                ? ""
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            type === framework.type
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
