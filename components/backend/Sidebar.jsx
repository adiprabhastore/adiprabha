"use client";
import React from "react";

const Sidebar = ({ setSelectedSection, selectedSection }) => {
    const menuData = {
        menu: [
            { name: "Dashboard", icon: "" },
            { name: "Upload", icon: "" },
            // { name: "Profile", icon: "" },
            // { name: "Contact Us", icon: "" },
            // { name: "Settings", icon: "" },
        ],
        // others: [
        //   { name: "Chart", icon: "📈" },
        //   { name: "Authentication", icon: "🔐" },
        // ],
    };

    return (
        <div className="w-64  bg-black text-white">
            <button
                className="p-4 text-3xl font-bold"
                onClick={() => window.location.reload()}
            >
                Adi Prabha
            </button>
            <div className="p-4">
                {/* Menu Section */}
                <div className="text-xs font-bold mb-4">MENU</div>
                <ul className="space-y-0">
                    {menuData.menu.map((item) => (
                        <li
                            key={item.name}
                            onClick={() => {
                                setSelectedSection(item.name);

                                if (item.name === "Dashboard") {
                                    window.location.reload();
                                }
                            }}
                            className={`flex items-center space-x-2 cursor-pointer p-2 uppercase
                ${
                    selectedSection === item.name
                        ? "bg-black-2 text-yellow-400"
                        : "hover:bg-black-2"
                }
              `}
                        >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>

                {/* Other Section */}
                {/* <div className="text-xs font-bold mt-8 mb-4">OTHERS</div>
        <ul className="space-y-4">
          {menuData.others.map((item) => (
            <li
              key={item.name}
              onClick={() => setSelectedSection(item.name)}
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md
                ${
                  selectedSection === item.name
                    ? "bg-gray-800 text-yellow-400"
                    : "hover:bg-gray-800"
                }
              `}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul> */}
            </div>
        </div>
    );
};

export default Sidebar;
