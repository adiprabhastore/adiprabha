// "use client";
// import EditFixedFields from "@/components/backend/Dashboard/EditFixedFields";
// import EditImages from "@/components/backend/Dashboard/EditImages";
// import Link from "next/link";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import React, { Suspense, useEffect, useRef, useState } from "react";

// const UpdateComp = () => {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const colln = searchParams.get("colln");

//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       <div className="flex items-start w-full">
//         <h1 className="mb-8">/Update</h1>
//         <button
//           className="bg-blue-500 p-5"
//           onClick={() => setShowUpdateComp(false)}
//         >
//           Dashboard
//         </button>
//         <div className="flex flex-col space-y-4">
//           {/* Wrap in a Suspense boundary */}
//           {id && colln && <EditImages id={id} colln={colln} />}
//           <EditFixedFields id={id} colln={colln} />
//         </div>
//       </div>
//     </Suspense>
//   );
// };

// export default UpdateComp;

import React from "react";

const Update = () => {
  return <div>page</div>;
};

export default Update;
