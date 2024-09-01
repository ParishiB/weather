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

import { Suspense } from "react";
import Weather from "../components/Weather";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TopSearch from "../components/TopSearch";

export default function Home() {
  const searchParams = useSearchParams();
  const locality_id = searchParams.get("locality_id");
  const area = searchParams.get("area");

  const [favArr, setFavArr] = useState<any[]>(() => {
    const savedFavArr = localStorage.getItem("favArr");
    return savedFavArr ? JSON.parse(savedFavArr) : [];
  });

  useEffect(() => {
    localStorage.setItem("favArr", JSON.stringify(favArr));
  }, [favArr]);

  return (
    <div>
      <Suspense fallback={<div>Loading Weather...</div>}>
        <Weather
          locality_id={locality_id}
          area={area}
          favArr={favArr}
          setFavArr={setFavArr}
        />
      </Suspense>
      <Suspense fallback={<div>Loading Top Search...</div>}>
        <TopSearch />
      </Suspense>
    </div>
  );
}
