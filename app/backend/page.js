"use client";
import Dashboard from "@/components/backend/Dashboard/Dashboard";
import Header from "@/components/backend/Header";
import List from "@/components/backend/Upload";
import Login from "@/components/backend/Login";
import Sidebar from "@/components/backend/Sidebar";
import { auth } from "@/db/firebase";
import { useAuth } from "@/hooks/useAuth";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { adminEmail } from "@/data/siteData";
import Upload from "@/components/backend/Upload";
// need to shift it
const Index = () => {
    const [selectedSection, setSelectedSection] = useState("Dashboard");
    const [type, setType] = useState("");

    const router = useRouter();
    const { user, loading } = useAuth();
    const [search, setSearch] = useState("");

    if (!loading && !user) {
        return <Login />;
    }

    if (user && user?.email !== adminEmail) {
        return (
            <div>
                <h1>Unauthorized</h1>
            </div>
        );
    }
    return (
        <div className="h-screen overflow-y-hidden">
            <div className="flex ">
                {/* Pass selectedSection to Sidebar */}
                <Sidebar
                    setSelectedSection={setSelectedSection}
                    selectedSection={selectedSection}
                />

                <div className="relative flex flex-col w-full h-full">
                    <Header
                        search={search}
                        setSearch={setSearch}
                        type={type}
                        setType={setType}
                    />
                    <main className="h-screen pb-20 overflow-auto overflow-y-auto overscroll-y-auto">
                        <div className="mx-auto ">
                            <SectionContent
                                section={selectedSection}
                                search={search}
                                setSearch={setSearch}
                                type={type}
                                setType={setType}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
// /sdfdf
const SectionContent = ({ section, search, setSearch, type, setType }) => {
    switch (section) {
        case "Dashboard":
            return (
                <Dashboard
                    search={search}
                    setSearch={setSearch}
                    type={type}
                    setType={setType}
                />
            );
        case "Upload":
            return <Upload />;
        case "Profile":
            return (
                <div className="text-3xl font-bold text-purple-600">
                    User Profile Details
                </div>
            );

        case "Contact Us":
            return (
                <div className="text-3xl font-bold text-red-600">
                    System Settings
                </div>
            );
        default:
            return <Dashboard />;
    }
};

export default Index;
