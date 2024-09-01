// "use client";
// import Weather from "../components/Weather";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import TopSearch from "../components/TopSearch";
// export default function Home() {
//   const searchParams = useSearchParams();
//   const locality_id = searchParams.get("locality_id");
//   const area = searchParams.get("area");

//   const [favArr, setFavArr] = useState<any[]>(() => {
//     const savedFavArr = localStorage.getItem("favArr");
//     return savedFavArr ? JSON.parse(savedFavArr) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("favArr", JSON.stringify(favArr));
//   }, [favArr]);

//   return (
//     <div>
//       <Weather
//         locality_id={locality_id}
//         area={area}
//         favArr={favArr}
//         setFavArr={setFavArr}
//       />
//       <TopSearch />
//     </div>
//   );
// }
// app/main/page.tsx
// "use client";

// import Weather from "../components/Weather";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import TopSearch from "../components/TopSearch";
// import SuspenseBoundary from "../components/SuspenseBoundary"; // Import the SuspenseBoundary component

// export default function Home() {
//   const searchParams = useSearchParams();
//   const locality_id = searchParams.get("locality_id");
//   const area = searchParams.get("area");

//   const [favArr, setFavArr] = useState<any[]>(() => {
//     const savedFavArr = localStorage.getItem("favArr");
//     return savedFavArr ? JSON.parse(savedFavArr) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("favArr", JSON.stringify(favArr));
//   }, [favArr]);

//   return (
//     <SuspenseBoundary>
//       <div>
//         <Weather
//           locality_id={locality_id}
//           area={area}
//           favArr={favArr}
//           setFavArr={setFavArr}
//         />
//         <TopSearch />
//       </div>
//     </SuspenseBoundary>
//   );
// }
// app/main/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const Weather = dynamic(() => import("../components/Weather"), { ssr: false });
const TopSearch = dynamic(() => import("../components/TopSearch"), {
  ssr: false,
});

function HomeContent() {
  const searchParams = useSearchParams();
  const locality_id = searchParams.get("locality_id") || null;
  const area = searchParams.get("area") || null;

  const [favArr, setFavArr] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const savedFavArr = localStorage.getItem("favArr");
      return savedFavArr ? JSON.parse(savedFavArr) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("favArr", JSON.stringify(favArr));
  }, [favArr]);

  return (
    <div>
      <Weather
        locality_id={locality_id}
        area={area}
        favArr={favArr}
        setFavArr={setFavArr}
      />
      <TopSearch />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
