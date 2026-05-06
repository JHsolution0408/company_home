import * as React from 'react'
import {
  DEFAULT_DRAG_THRESHOLD,
  DEFAULT_TAP_DISTANCE,
  DEFAULT_TAP_TIME,
} from '../../utils/slider'
import { useSliderScroll } from './useSliderScroll'
import { useSliderInertia } from './useSliderInertia'
import { useSliderPointer } from './useSliderPointer'

/**
 * useSlider
 *
 * ref를 전달받아 무한 스크롤을 지원하는 슬라이더.
 * 책임을 scroll(상태/측정/dot 이동) · inertia(관성) · pointer(입력)로 분리하고
 * 공유 애니메이션 ref(anim)를 통해 세 훅이 동일한 RAF/속도/드래그 플래그를 공유한다.
 */
export function useSlider({
  ref,                 // 스크롤 컨테이너에 대한 외부 React ref (필수)
  itemsLength,         // 슬라이드될 아이템 개수 (필수)
  dragThreshold = DEFAULT_DRAG_THRESHOLD,
  tapDistance = DEFAULT_TAP_DISTANCE,
  tapTime = DEFAULT_TAP_TIME,
  onIndexChange,       // 선택: 인덱스 변경 콜백(idx)
  getHrefFromEvent,    // 선택: function(e) -> href; 제공 시 탭/클릭 확정 시 navigate(href) 호출
}) {
  // React 훅 규칙을 지키기 위해 내부 ref는 조건 없이 항상 생성합니다.
  const internalRef = React.useRef(null)
  const sliderRef = ref ?? internalRef

  // 포인터/관성/스크롤 훅이 공유하는 애니메이션 상태(RAF id, 속도, 드래그 플래그 등)
  const anim = React.useRef({
    rafId: 0,
    inertId: 0,
    nextLeft: 0,
    pending: false,
    lastX: 0,
    lastT: 0,
    vx: 0,
    dragging: false,
  })

  const scroll = useSliderScroll({
    sliderRef,
    itemsLength,
    onIndexChange,
  })

  const inertia = useSliderInertia({
    sliderRef,
    anim,
    updateIndex: (left) => scroll.updateIndexFromLeft(left, scroll.itemStride, itemsLength),
  })

  const pointer = useSliderPointer({
    sliderRef,
    itemStride: scroll.itemStride,
    itemsLength,
    anim,
    dragThreshold,
    tapDistance,
    tapTime,
    getHrefFromEvent,
    updateIndexFromLeft: scroll.updateIndexFromLeft,
    runInertia: inertia.runInertia,
  })

  // dot 클릭 시 진행 중인 관성 RAF/드래그 RAF/잔여 속도/드래그 플래그를 정리한 뒤 부드럽게 이동
  const handleDotClick = (idx) => {
    inertia.stopInertia()
    pointer.cancelDragRaf()
    anim.current.vx = 0
    anim.current.dragging = false
    scroll.scrollToIndex(idx)
  }

  return {
    sliderRef,
    current: scroll.current,
    next: () => handleDotClick((scroll.current + 1) % (itemsLength || 1)),
    itemStride: scroll.itemStride,
    gap: scroll.gap,
    padOn: scroll.padOn,
    setPadOn: scroll.setPadOn,
    handleDotClick,
    handlers: pointer.handlers,
  }
}
