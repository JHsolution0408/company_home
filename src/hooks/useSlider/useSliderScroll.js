import * as React from 'react'

/**
 * useSliderScroll
 *
 * 슬라이더의 스크롤 좌표를 단일 진실 공급원으로 삼아 인덱스를 계산하고,
 * 무한 루프(양 끝 정규화), gap/stride 측정, dot 클릭 시 nearest reachable 좌표 이동을 담당한다.
 */
export function useSliderScroll({
  sliderRef,
  itemsLength,
  onIndexChange,
}) {
  const [current, setCurrent] = React.useState(0)
  const [gap, setGap] = React.useState(0)
  const [itemStride, setItemStride] = React.useState(0)
  const [padOn, setPadOn] = React.useState(true)

  const currentRef = React.useRef(0)
  const isNormalizing = React.useRef(false)

  // 스크롤 좌표(left)로부터 현재 아이템 인덱스를 계산하고 변경 시 setState/콜백을 트리거
  const updateIndexFromLeft = (left, stride, itemsLen) => {
    if (!itemsLen || !stride) return
    const setWidth = stride * itemsLen
    // 음수 모듈러 보정 포함
    const relRaw = left % setWidth
    const rel = ((relRaw) + setWidth) % setWidth
    let idx = Math.round(rel / stride)
    if (idx >= itemsLen) idx = 0
    if (idx < 0) idx = 0
    if (currentRef.current !== idx) {
      currentRef.current = idx
      setCurrent(idx)
      onIndexChange && onIndexChange(idx)
    }
  }

  // 마운트/업데이트 시 gap/stride를 계산하고 스크롤을 가운데 세트로 배치
  React.useEffect(() => {
    const slider = sliderRef.current
    if (!slider || !itemsLength) return
    const first = slider.firstChild
    if (!first) return

    const computed = window.getComputedStyle(slider)
    const gapStr = computed.gap || computed.columnGap || '30px'
    const g = parseFloat(gapStr) || 30
    setGap(g)

    const stride = first.offsetWidth + g
    const setWidth = stride * itemsLength
    setItemStride(stride)

    // 터치 기기에서 기본 제스처를 브라우저에 맡겨(iOS Safari 호환) 수평/수직 패닝 모두 허용
    const prevTA = slider.style.touchAction
    slider.dataset.prevTouchAction = prevTA
    slider.style.touchAction = 'auto'
    // iOS 관성 스크롤 활성화
    const prevWO = slider.style.webkitOverflowScrolling
    slider.dataset.prevWebkitOverflowScrolling = prevWO
    slider.style.webkitOverflowScrolling = 'touch'

    // 두 번째 세트의 시작 지점으로 배치
    requestAnimationFrame(() => {
      if (slider.scrollLeft < setWidth * 0.5) {
        slider.scrollLeft = setWidth + (slider.scrollLeft || 0)
      }
    })

    const onScroll = () => {
      const maxScroll = slider.scrollWidth
      const left = slider.scrollLeft
      const epsilon = 1

      if (padOn && left > 0) setPadOn(false)

      // 양 끝 경계 정규화
      if (!isNormalizing.current) {
        if (left <= epsilon) {
          isNormalizing.current = true
          const prevBehavior = slider.style.scrollBehavior
          slider.style.scrollBehavior = 'auto'
          slider.scrollLeft = left + setWidth
          slider.style.scrollBehavior = prevBehavior
          isNormalizing.current = false
          return
        }
        if (left + slider.clientWidth >= maxScroll - epsilon) {
          isNormalizing.current = true
          const prevBehavior = slider.style.scrollBehavior
          slider.style.scrollBehavior = 'auto'
          slider.scrollLeft = left - setWidth
          slider.style.scrollBehavior = prevBehavior
          isNormalizing.current = false
          return
        }
      }

      // 현재 스크롤 좌표로부터 인덱스를 항상 갱신 (드래그/관성 중에도)
      updateIndexFromLeft(left, stride, itemsLength)
    }

    slider.addEventListener('scroll', onScroll)
    return () => {
      slider.removeEventListener('scroll', onScroll)

      const prevTA = slider.dataset.prevTouchAction
      if (prevTA !== undefined) {
        slider.style.touchAction = prevTA
      }

      const prevWO = slider.dataset.prevWebkitOverflowScrolling
      if (prevWO !== undefined) {
        slider.style.webkitOverflowScrolling = prevWO
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsLength])

  // 도트(인디케이터) 클릭 시 가장 가까운 도달 가능한 동일 인덱스 좌표로 부드럽게 이동
  const scrollToIndex = (idx) => {
    const slider = sliderRef.current
    if (!slider || !itemStride || !itemsLength) return
    const stride = itemStride
    const setWidth = stride * itemsLength
    // 듀얼 세트 레이아웃이라 같은 idx에 대해 여러 좌표가 존재하지만,
    // 실제 스크롤 가능한 최대 좌표(maxLeft)를 넘는 후보는 브라우저가 클램프하면서
    // onScroll이 잘못된 인덱스로 덮어써버리므로 도달 가능한 후보만 사용한다.
    const maxLeft = Math.max(0, slider.scrollWidth - slider.clientWidth)

    const base = setWidth + stride * idx
    const reachable = [base - setWidth, base, base + setWidth]
      .filter(c => c >= 0 && c <= maxLeft)
    // 모든 후보가 범위를 벗어나는 비정상 케이스는 첫 세트 위치로 폴백
    const candidates = reachable.length ? reachable : [Math.min(Math.max(stride * idx, 0), maxLeft)]

    const currentLeft = slider.scrollLeft
    const targetLeft = candidates.reduce((best, c) => (
      Math.abs(c - currentLeft) < Math.abs(best - currentLeft) ? c : best
    ), candidates[0])

    slider.scrollTo({ left: targetLeft, behavior: 'smooth' })
    setCurrent(idx)
    onIndexChange && onIndexChange(idx)
  }

  return {
    current,
    gap,
    itemStride,
    padOn,
    setPadOn,
    updateIndexFromLeft,
    scrollToIndex,
  }
}
