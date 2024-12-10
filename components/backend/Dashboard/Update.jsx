"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EditImages from "./EditImages";
import EditFixedFields from "./EditFixedFields";

const UpdateComp = ({ setShowUpdateComp, id, colln }) => {
    return (
      <div className="flex flex-col items-start w-full overflow-auto h-full">
        {/* <h1 className="mb-8">/Update</h1> */}
        <button
          className="bg-blue-500 p-5"
          onClick={() => setShowUpdateComp(false)}
        >
          Dashboard
        </button>
        <div className="flex flex-col space-y-4 w-full p-4">
          <EditImages id={id} colln={colln} />
          <EditFixedFields id={id} colln={colln} />
        </div>
      </div>
    );
};

export default UpdateComp;
