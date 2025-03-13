"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, ShoppingBag, Search, Logs, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { adminEmail } from "@/data/siteData";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/db/firebase"; // Ensure you import the Firestore instance
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore methods

const Topbar = () => {
    const [value, setValue] = useState("");
    const { user, loading } = useAuth();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const [error, setError] = useState(null);

    if (loading) {
        return <p>Loading...</p>; // Simple loading message or spinner
    }

    const handleSearch = () => {
        const type = value ? value : "BOOKS";
        router.push(`/search?type=${type}&query=${searchValue}`);
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const res = await signInWithPopup(auth, provider);
            const user = res.user;

            if (user) {
                const userEmail = user.email;
                const userDocRef = doc(db, "user", userEmail);

                // Check if the document exists
                const userDocSnap = await getDoc(userDocRef);

                if (!userDocSnap.exists()) {
                    // If it doesn't exist, create a new document with the user's data
                    await setDoc(userDocRef, {
                        email: userEmail,
                        name: user.displayName,
                        cart: [], // Initialize cart if needed
                        // Add other user fields as necessary
                    });
                }
            }

            // Redirect to the home page after login
            router.push("/");
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <header className="w-full px-1">
            {/* Logo */}
            <div className="flex items-center justify-between py-2 ">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo-png.png"
                        className="h-[40px] md:h-[65px] w-auto"
                        width={999}
                        height={999}
                        alt=""
                    />
                    <div className="flex flex-col justify-center items-start md:items-center">
                        <span className="md:ml-1 text-orange-500 md:text-4xl tracking-wide font-semibold mx-2">
                            Adi Prabha
                        </span>
                        <span className="w-fit text-[0.5rem] md:text-xs tracking-wider text-orange-400 flex justify-start gap-1 mr-1">
                            <span>TREE</span>
                            <span>OF</span>
                            <span>ENLIGHTENMENT</span>
                        </span>
                    </div>
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex items-center rounded-full w-[40%] border-gray-500 border-[1px]">
                    <div className="flex">
                        <ComboboxDemo value={value} setValue={setValue} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for books and categories..."
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

                {/* User Actions */}
                <div>
                    {user ? (
                        user.email === adminEmail ? (
                            <div className="flex px-2 space-x-3 text-gray-900">
                                <Link
                                    href="/backend"
                                    className="flex items-center space-x-1"
                                >
                                    <LogIn />
                                    <span className="font-semibold">
                                        Admin Panel
                                    </span>
                                </Link>
                                <p className="flex items-center text-red-500 hover:text-red-700 cursor-pointer">
                                    <span
                                        onClick={() => auth.signOut()}
                                        className="flex font-semibold"
                                    >
                                        <LogOut />
                                        <span>Logout</span>
                                    </span>
                                </p>
                            </div>
                        ) : (
                            <div className="flex px-2 space-x-3 text-gray-900 justify-evenly">
                                <Link
                                    href="/my-orders"
                                    className="flex items-center space-x-1"
                                >
                                    <span className="flex font-semibold flex-col md:flex-row jusityf-center items-center">
                                        <Logs className="text-gray-700" />
                                        <span className="flex">
                                            <span className="hidden md:block">
                                                My&nbsp;
                                            </span>
                                            <span>Orders</span>
                                        </span>
                                    </span>
                                </Link>
                                <Link
                                    href="/Cart"
                                    className="flex items-center space-x-1"
                                >
                                    <span className="flex font-semibold flex-col md:flex-row jusityf-center items-center">
                                        <ShoppingBag className="text-gray-700" />
                                        <span>Cart</span>
                                    </span>
                                </Link>
                                <Link
                                    href="/Wishlist"
                                    className="flex items-center space-x-1"
                                >
                                    <span className="flex font-semibold flex-col md:flex-row jusityf-center items-center">
                                        <Star className="text-gray-700" />
                                        <span>Wishlist</span>
                                    </span>
                                </Link>
                                <p className="flex  items-center text-red-500 hover:text-red-700 cursor-pointer">
                                    <span
                                        onClick={() => auth.signOut()}
                                        className="flex font-semibold flex-col md:flex-row jusityf-center items-center"
                                    >
                                        <LogOut />
                                        <span className="">Logout</span>
                                    </span>
                                </p>
                            </div>
                        )
                    ) : (
                        <div className="text-orange-500 hover:text-orange-600">
                            <button
                                onClick={handleGoogleLogin}
                                className="flex items-center space-x-1"
                            >
                                <LogIn />
                                <span>Login</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Search Bar for mobile */}
            <div className="md:hidden flex items-center rounded-full w-full px-1 m-2 mx-auto border-gray-500 border-[1px]">
                <div className="flex">
                    <ComboboxDemo value={value} setValue={setValue} />
                </div>
                <input
                    type="text"
                    placeholder="Search for books and categories..."
                    className="flex-grow ml-1 px-1 py-2 focus:outline-none tracking-wider text-gray-700"
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
        </header>
    );
};

export default Topbar;

const frameworks = [
    {
        value: "BOOKS",
        label: "BOOKS",
    },
    {
        value: "CATEGORIES",
        label: "CATEGORIES",
    },
    {
        value: "ISBN",
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

function ComboboxDemo({ value, setValue }) {
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
                    {value
                        ? frameworks.find(
                              (framework) => framework.value === value
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
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ""
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value
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
