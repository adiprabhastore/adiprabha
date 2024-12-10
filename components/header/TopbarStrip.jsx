import React from "react";
import Link from "next/link";
const TopbarStrip = () => {
    return (
        <div className="text-gray-100  bg-[#d78030] w-full flex justify-between px-2 md:px-[100px] py-1 tracking-wide text-md">
            <p className=" ">For All Things Ethnic.</p>
            <div className="flex justify-evenly gap-5">
                <Link href="/sign-in">Sign In</Link>
                <Link href="/contact">Contact</Link>
                <Link href="faq">FAQ</Link>
            </div>
        </div>
    );
};

export default TopbarStrip;
