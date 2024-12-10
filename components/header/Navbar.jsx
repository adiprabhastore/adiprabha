"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
// import useCartStore from "@/store/checkoutState";
import { navbar } from "@/data/nav";
import { nav2 } from "@/data/nav2";

const Navbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    //   const cartItems = useCartStore((state) => state.cartItems);

    return (
        <nav
            className={`sticky top-0   dark::bg-gray-900 ${
                pathname === "/checkout" && "hidden"
            } ${
                pathname === "/Admin" && "hidden"
            } w-full top-0 start-0 p-2  z-50`}
        >
            <div className="flex flex-wrap items-center justify-between mx-4 p-1">
                {/* Mobile */}
                <Mobile mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
                {/* Desktop */}
                <Desktop
                    mobileMenu={mobileMenu}
                    setMobileMenu={setMobileMenu}
                />
            </div>
        </nav>
    );
};

export default Navbar;

const CollapsibleNavLink = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubmenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                className="flex items-center justify-between py-2 px-4 w-full bg-gray-100 -md hover:bg-gray-300 transition-colors"
                onClick={toggleSubmenu}
            >
                <span>{title}</span>

                <ChevronDown
                    className={`w-4 h-4 fill-current transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            <div
                className={`nav-submenu pl-6 pt-2 space-y-1 ${
                    isOpen ? "block" : "hidden"
                }`}
            >
                {children}
            </div>
        </div>
    );
};

const NavSubmenuItem = ({ url, children, ...rest }) => (
    <li>
        <a
            href={url}
            className="block py-1 px-2  hover:bg-gray-200 transition-colors"
            {...rest}
        >
            {children}
        </a>
    </li>
);

const Mobile = ({ mobileMenu, setMobileMenu }) => {
    return (
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {mobileMenu && (
                <section
                    className="absolute top-0 right-0   min-w-[100%] h-full p-2   bg-red-500 "
                    id="mobileMenuContent"
                >
                    <button
                        onClick={() => {
                            setMobileMenu(false);
                        }}
                        className="p-2 mt-5 ml-5"
                    >
                        <X className="hover:scale-110 hover:text-red-700 font-bold" />
                    </button>
                    <div className="p-2">
                        <ul className="  left-0 mt-2 py-2    top-4 -md  z-999  w-full  ">
                            <li className="mb-1 bg-gray-100">
                                <Link
                                    href="/"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100  "
                                    onClick={() => {
                                        setMobileMenu(false);
                                    }}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="mb-1 bg-gray-100">
                                <Link
                                    href="/HotspotsOfGoa"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    onClick={() => {
                                        setMobileMenu(false);
                                    }}
                                >
                                    Hotspots of Goa
                                </Link>
                            </li>
                            <li className="mb-1 bg-gray-100">
                                <div className="space-y-2">
                                    <CollapsibleNavLink title="Rent">
                                        <NavSubmenuItem url="/Rent#car">
                                            Car
                                        </NavSubmenuItem>
                                        <NavSubmenuItem url="/Rent#bus">
                                            Bus
                                        </NavSubmenuItem>
                                        <NavSubmenuItem url="/Rent#taxi">
                                            Taxi
                                        </NavSubmenuItem>
                                        <NavSubmenuItem url="/Rent#tempo">
                                            Tempo
                                        </NavSubmenuItem>
                                    </CollapsibleNavLink>
                                </div>
                            </li>
                            <li className="mb-1 bg-gray-100">
                                <div className="space-y-2">
                                    <CollapsibleNavLink title="Booking">
                                        <NavSubmenuItem url="/Booking#hotel">
                                            Hotel
                                        </NavSubmenuItem>
                                        <NavSubmenuItem url="/Booking#villa">
                                            Villa
                                        </NavSubmenuItem>
                                        <NavSubmenuItem url="/Booking#yacht">
                                            Yacht
                                        </NavSubmenuItem>
                                    </CollapsibleNavLink>
                                </div>
                            </li>
                            <li className="mb-1 bg-gray-100">
                                <Link
                                    href="/Sightseeing"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    onClick={() => {
                                        setMobileMenu(false);
                                    }}
                                >
                                    Sightseeing
                                </Link>
                            </li>
                            <li className="mb-1 bg-gray-100">
                                <Link
                                    href="/Contact"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    onClick={() => {
                                        setMobileMenu(false);
                                    }}
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li className="mb-1 bg-gray-100">
                                <Link
                                    href="/Gallery"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    onClick={() => {
                                        setMobileMenu(false);
                                    }}
                                >
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
            )}
        </div>
    );
};

const Desktop = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [showSubmenu, setShowSubmenu] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleMouseEnter = (category) => {
        setShowSubmenu((prevState) => ({
            ...prevState,
            [category]: true,
        }));
    };

    const handleMouseLeave = (category) => {
        setShowSubmenu((prevState) => ({
            ...prevState,
            [category]: false,
        }));
        setSelectedCategory(""); // Ensure the submenu closes when hovering out
    };

    const handleSubCategoryMouseEnter = (item) => {
        setSelectedCategory(item);
    };

    return (
        <div>
            <ul
                className="flex items-center justify-between w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
            >
                <li className="relative hover:bg-gray-100 py-1">
                    <Link
                        href="/"
                        className={`block px-3 ${
                            pathname === "/"
                                ? "text-green-500"
                                : "text-gray-900"
                        }`}
                        aria-current="page"
                    >
                        Home
                    </Link>
                </li>

                {Object.keys(nav2).map((menu) => (
                    <li
                        key={menu}
                        className="relative hover:bg-gray-100 py-1"
                        onMouseEnter={() => handleMouseEnter(menu)}
                        onMouseLeave={() => handleMouseLeave(menu)}
                    >
                        <Link
                            href={`/category/${menu}`}
                            className={`flex px-3 ${
                                pathname.includes(encodeURIComponent(menu))
                                    ? "text-green-500"
                                    : "text-gray-900"
                            }`}
                        >
                            {menu}
                        </Link>

                        {showSubmenu[menu] && (
                            <ul className="w-max absolute left-0 py-1 top-8 z-20 bg-white">
                                {Object.keys(nav2[menu]).map((item, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 "
                                    >
                                        <li
                                            className="text-start text-gray-800  "
                                            onMouseEnter={() =>
                                                handleSubCategoryMouseEnter(
                                                    item
                                                )
                                            }
                                        >
                                            <button
                                                className="cursor-pointer text-start px-4 py-1  w-full hover:bg-gray-100"
                                                onClick={() =>
                                                    router.push(
                                                        `/category/${menu}/${item}`
                                                    )
                                                }
                                            >
                                                {item}
                                                {nav2[menu][item].length >
                                                    0 && <span>›</span>}
                                            </button>

                                            {/* Third-level dropdown */}
                                            {nav2[menu][selectedCategory] &&
                                                selectedCategory === item && (
                                                    <div className="absolute left-full top-0 w-64 bg-white">
                                                        <ul>
                                                            {nav2[menu][
                                                                selectedCategory
                                                            ].map(
                                                                (
                                                                    subCategory,
                                                                    subIndex
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            subIndex
                                                                        }
                                                                        className=" "
                                                                    >
                                                                        <button
                                                                            className="p-2 cursor-pointer text-start px-4 py-1  w-full hover:bg-gray-100"
                                                                            onClick={() =>
                                                                                router.push(
                                                                                    `/category/${menu}/${item}/${subCategory}`
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                subCategory
                                                                            }
                                                                        </button>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const BestTimeToVisit = () => {
    return (
        <div className=" grid grid-cols-2 justify-between whitespace-nowrap">
            <div className=" p-4">
                <h2 className="text-xl font-bold mb-4">By Seasons</h2>
                <ul className="mb-4">
                    <li className="flex items-center">
                        <span className="text-red-500 mr-2">◇</span> Winter
                    </li>
                    <li className="flex items-center">
                        <span className="text-red-500 mr-2">◇</span> Summer
                    </li>
                    <li className="flex items-center">
                        <span className="text-red-500 mr-2">◇</span> Monsoon
                    </li>
                </ul>
                <a href="#" className="text-blue-500 hover:underline">
                    View All »
                </a>
            </div>
            <div className="p-1">
                <h2 className="text-xl font-bold mb-4">By Month</h2>
                <ul className="mb-4">
                    <li className="flex items-center">
                        <span className="text-red-500 mr-2">◇</span> January
                    </li>
                    <li className="flex items-center">
                        <span className="text-red-500 mr-2">◇</span> February
                    </li>
                    <li className="flex items-center">
                        <span className="text-red-500 mr-2">◇</span> March
                    </li>
                </ul>
                <a href="#" className="text-blue-500 hover:underline">
                    View All »
                </a>
            </div>
        </div>
    );
};

const SvgComp = () => {
    return (
        <svg
            className="w-4 h4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                    d="M7 10L12 15L17 10"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />{" "}
            </g>
        </svg>
    );
};
