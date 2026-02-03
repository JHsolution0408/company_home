import * as React from "react"

/**
 * useIsMobile
 * 현재 디바이스가 모바일인지 여부를 반환하는 커스텀 훅입니다.
 *
 * - 기본 breakpoint는 450px
 * - window resize 이벤트를 감지하여 반응형 상태를 실시간으로 업데이트합니다.
 *
 * @param {number} breakpoint - 모바일로 판단할 기준 너비(px)
 * @returns {boolean} isMobile - 현재 화면이 breakpoint 미만인지 여부
 *
 * 사용 예:
 * const isMobile = useIsMobile();        // 450px 기준
 * const isMobile = useIsMobile(768);     // 커스텀 기준
 */
export const useIsMobile = (breakpoint = 450) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
};
