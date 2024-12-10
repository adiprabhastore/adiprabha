"use client";
import React from "react";
import Topbar from "./Topbar";
import Navbar2 from "./Navbar2";
import TopbarStrip from "./TopbarStrip";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const Header = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
    }, []);
    const pathname = usePathname();
    const hideFooterRoutes = ["/backend"];

    const shouldHideFooter = hideFooterRoutes.includes(pathname);

    if (shouldHideFooter) {
        return;
    }
    // deploying through me

    return (
        <div>
            {/* <TopbarStrip /> */}
            <div className=" lg:px-10">
                <Topbar />
                {isLoaded && <Navbar2 />}
            </div>
        </div>
    );
};

export default Header;
