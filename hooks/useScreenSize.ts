// import { useEffect, useState } from "react";

// function getCurrentScreenSize() {
//   const isMobileView = window.matchMedia("(max-width: 576px)").matches;
//   const isLargeMobile = window.matchMedia(
//     "(min-width: 576px) and (max-width: 912px)"
//   ).matches;
//   const isIpad = window.matchMedia(
//     "(min-width: 912px) and (max-width: 1100px)"
//   ).matches;
//   const isLargeView = window.matchMedia("(min-width: 1100px)").matches;
//   return {
//     isMobileView,
//     isLargeMobile,
//     isIpad,
//     isLargeView,
//   };
// }

// export const useScreenSize = () => {
//   const [screenInfo, setScreenInfo] = useState(() => getCurrentScreenSize());

//   useEffect(() => {
//     const handleResize = () => setScreenInfo(getCurrentScreenSize());

//     window.addEventListener("resize", handleResize);

//     handleResize();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const { isMobileView, isLargeMobile, isIpad, isLargeView } = screenInfo;

//   return { isMobileView, isLargeMobile, isIpad, isLargeView };
// };
// hooks/useScreenSize.js
import { useState, useEffect } from "react";

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    isMobileView: false,
    isLargeMobile: false,
    isLargeView: false,
    isIpad: false,
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setScreenSize({
        isMobileView: width < 768,
        isLargeMobile: width >= 768 && width < 1024,
        isLargeView: width >= 1024,
        isIpad: width >= 768 && width < 1024,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
