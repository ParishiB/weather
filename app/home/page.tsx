// "use client";
// import React from "react";
// import Search from "../components/Search";
// import h11 from "../../public/h11.png";
// import h22 from "../../public/h22.png";
// import Image from "next/image";
// import { useScreenSize } from "@/hooks/useScreenSize";
// import globe from "../../public/globe.jpg";
// import Carousel from "../components/Carousel";
// function HomePage() {
//   const { isMobileView, isLargeMobile, isLargeView, isIpad } = useScreenSize();
//   return (
//     <>
//       <div className="p-5 m-20 mt-0">
//         <div className="relative w-full">
//           <div className="flex items-center">
//             <Image
//               className="h-[330px] w-[400px] -mb-20 -ml-24"
//               src={globe}
//               alt=""
//             />
//             <div className="mt-16">
//               <h1 className="ml-4">
//                 <Image
//                   src={h11}
//                   alt=""
//                   className={`${isMobileView ? "h-[80px] w-[200px]" : ""}`}
//                 />
//               </h1>
//               <h2 className="ml-4 -mt-6">
//                 <Image
//                   src={h22}
//                   alt=""
//                   className={`${isMobileView ? "h-0" : ""}`}
//                 />
//               </h2>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Search />
//       {/* <Carousel /> */}
//     </>
//   );
// }
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../app/globals.css";

function Page() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = () => {
      router.push("/home");
    };

    const timeoutId = setTimeout(() => {
      handleRedirect();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <div className="relative w-full h-screen font-bold">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/cloud.mp4" // Ensure this file exists in the public directory
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-center px-4">
        <h1 className="text-white text-2xl mb-4">Welcome to Weather Union</h1>
        <h2 className="text-white text-xl max-w-screen-md leading-relaxed">
          Whatever locality data you want to check, we have it here
        </h2>
      </div>
    </div>
  );
}

export default Page;
