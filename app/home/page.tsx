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
// export default HomePage;
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

// export default HomePage;
"use client";
import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import h11 from "../../public/h11.png";
import h22 from "../../public/h22.png";
import Image from "next/image";
import globe from "../../public/globe.jpg";
import Carousel from "../components/Carousel";

function HomePage() {
  const [screenSize, setScreenSize] = useState({
    isMobileView: false,
    isLargeMobile: false,
    isLargeView: false,
    isIpad: false,
  });

  useEffect(() => {
    const { useScreenSize } = require("@/hooks/useScreenSize");
    const { isMobileView, isLargeMobile, isLargeView, isIpad } =
      useScreenSize();
    setScreenSize({ isMobileView, isLargeMobile, isLargeView, isIpad });
  }, []);

  return (
    <>
      <div className="p-5 m-20 mt-0">
        <div className="relative w-full">
          <div className="flex items-center">
            <Image
              className="h-[330px] w-[400px] -mb-20 -ml-24"
              src={globe}
              alt=""
            />
            <div className="mt-16">
              <h1 className="ml-4">
                <Image
                  src={h11}
                  alt=""
                  className={`${
                    screenSize.isMobileView ? "h-[80px] w-[200px]" : ""
                  }`}
                />
              </h1>
              <h2 className="ml-4 -mt-6">
                <Image
                  src={h22}
                  alt=""
                  className={`${screenSize.isMobileView ? "h-0" : ""}`}
                />
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Search />
      {/* <Carousel /> */}
    </>
  );
}

export default HomePage;
