export function getCurrentScreenSize() {
  const isMobileView = window.matchMedia("(max-width: 576px)").matches;
  const isLargeMobile = window.matchMedia(
    "(min-width: 576px) and (max-width: 912px)"
  ).matches;
  const isIpad = window.matchMedia(
    "(min-width: 912px) and (max-width: 1100px)"
  ).matches;
  const isLargeView = window.matchMedia("(min-width: 1100px)").matches;
  return {
    isMobileView,
    isLargeMobile,
    isIpad,
    isLargeView,
  };
}
