// 슬라이더 상호작용 유틸리티와 기본값

export const DEFAULT_DRAG_THRESHOLD = 8; // 마우스/펜 드래그 판정 임계값(px)
export const DEFAULT_TAP_DISTANCE = 8;   // 터치 탭 판정 거리 임계값(px)
export const DEFAULT_TAP_TIME = 300;     // 터치 탭 판정 시간 임계값(ms)

// 슬라이더별 튜닝 값(페이지에서 재사용 가능)
export const DRAG_THRESHOLD_SOLUTIONS = 3;
export const DRAG_THRESHOLD_PRESS = 10;

export const exceededDragThreshold = (dx, threshold = DEFAULT_DRAG_THRESHOLD) => {
  return Math.abs(dx) > threshold;
};
