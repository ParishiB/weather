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
