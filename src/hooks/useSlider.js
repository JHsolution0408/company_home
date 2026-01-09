import * as React from 'react'
import { navigate } from 'gatsby'
import { exceededDragThreshold, DEFAULT_DRAG_THRESHOLD, DEFAULT_TAP_DISTANCE, DEFAULT_TAP_TIME } from '../utils/slider'

/**
 * useSlider — 수평 스크롤형 캐러셀(중복 트랙 [A..N][A..N] 기반의 유사 무한 루프)을 위한 재사용 가능한 훅.
 *
 * 주요 기능:
 * - 외부에서 전달된 스크롤 컨테이너 ref를 사용해 유연하게 동작.
 * - 첫 번째 자식의 너비 + CSS gap을 이용해 아이템 이동 간격(stride) 계산.
 * - 스크롤 위치를 두 번째 세트(가운데 세트)로 유지하고 양 끝에서 자연스럽게 정규화.
 * - 원본 세트 범위 [0..N-1] 내의 현재 인덱스를 노출.
 * - 드래그(마우스/펜)와 탭(터치)을 견고하게 구분하고 관성 스크롤을 지원.
 * - 탭/클릭이 확정된 경우 getHrefFromEvent로 얻은 링크로 programmatic navigation(navigate)을 수행(선택).
 * - 도트 클릭 시 중복 세트들 중 가장 가까운 후보 위치로 스크롤하는 헬퍼 제공.
 */
export function useSlider({
  ref,                 // 스크롤 컨테이너에 대한 외부 React ref (필수)
  itemsLength,         // 고유 아이템 개수 (필수)
  dragThreshold = DEFAULT_DRAG_THRESHOLD,   // 드래그로 간주할 마우스/펜 이동 임계값(px)
  tapDistance = DEFAULT_TAP_DISTANCE,       // 터치 탭 판정을 위한 거리 임계값(px)
  tapTime = DEFAULT_TAP_TIME,               // 터치 탭 판정을 위한 시간 임계값(ms)
  onIndexChange,       // 선택: 인덱스 변경 콜백(idx)
  getHrefFromEvent,    // 선택: function(e) -> href 문자열; 제공 시 탭/클릭 확정 시 navigate(href) 호출
}) {
  // React 훅 규칙을 지키기 위해 내부 ref는 조건 없이 항상 생성합니다.
  const internalRef = React.useRef(null)
  const sliderRef = ref ?? internalRef
  const [current, setCurrent] = React.useState(0)
  const [gap, setGap] = React.useState(0)
  const [itemStride, setItemStride] = React.useState(0)
  const [padOn, setPadOn] = React.useState(true)

  const isNormalizing = React.useRef(false)
  const drag = React.useRef({ isDown: false, startX: 0, startLeft: 0 })
  const anim = React.useRef({ rafId: 0, inertId: 0, nextLeft: 0, pending: false, lastX: 0, lastT: 0, vx: 0, dragging: false })
  const touchTap = React.useRef({ x: 0, y: 0, t: 0 })
  // 명시적 상호작용 상태
  const isPressingRef = React.useRef(false)
  const isDraggingRef = React.useRef(false)

  // 인덱스 갱신: 연속 스크롤 좌표를 단일 계산 함수로 통합하고,
  // 같은 인덱스면 setState를 피해서 렌더를 최소화합니다.
  const currentRef = React.useRef(0)
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

    // 터치 기기에서 수직 스크롤(pan-y)은 브라우저에 맡기고, 수평 제스처는 컴포넌트가 처리하도록 지정
    const prevTA = slider.style.touchAction
    slider.dataset.prevTouchAction = prevTA
    slider.style.touchAction = 'pan-y'

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
      // 복원: touch-action
      const prevTA = slider.dataset.prevTouchAction
      if (prevTA !== undefined) slider.style.touchAction = prevTA
    }
  }, [itemsLength])

  const handleDotClick = (idx) => {
    const slider = sliderRef.current
    if (!slider || !itemStride || !itemsLength) return
    const stride = itemStride
    const setWidth = stride * itemsLength

    const base = setWidth + stride * idx
    const candidates = [base, base - setWidth, base + setWidth]
    const currentLeft = slider.scrollLeft
    const targetLeft = candidates.reduce((best, c) => (
      Math.abs(c - currentLeft) < Math.abs(best - currentLeft) ? c : best
    ), candidates[0])

    slider.scrollTo({ left: targetLeft, behavior: 'smooth' })
    setCurrent(idx)
    onIndexChange && onIndexChange(idx)
  }

  // 포인터 핸들러
  // 포인터 캡처로 인한 타깃 변경을 고려하여 href를 견고하게 해석
  const resolveHrefFromEvent = (e) => {
    let href = null
    try {
      if (typeof getHrefFromEvent === 'function') {
        href = getHrefFromEvent(e) || null
      }
    } catch {}
    if (!href) {
      try {
        if (typeof document !== 'undefined' && typeof document.elementFromPoint === 'function') {
          const x = e.clientX ?? 0
          const y = e.clientY ?? 0
          const el = document.elementFromPoint(x, y)
          const anchor = el && (el.closest ? el.closest('a, [role="link"]') : null)
          if (anchor && anchor.getAttribute) {
            href = anchor.getAttribute('href') || null
          }
        }
      } catch {}
    }
    return href
  }

  // --- 명시적 상태를 사용하는 내부 상호작용 헬퍼 ---
  const handleInteractionStart = (e) => {
    const slider = sliderRef.current
    if (!slider) return

    if (e.pointerType === 'touch') {
      // 터치 시작: 탭 판정 기준 기록 + 드래그 준비 상태로 초기화
      touchTap.current = { x: e.clientX, y: e.clientY, t: performance.now() }
      isPressingRef.current = true
      isDraggingRef.current = false

      if (anim.current.inertId) cancelAnimationFrame(anim.current.inertId)
      anim.current.inertId = 0

      drag.current.isDown = true
      anim.current.dragging = true
      drag.current.startX = e.clientX || 0
      drag.current.startLeft = slider.scrollLeft
      anim.current.lastX = e.clientX || 0
      anim.current.lastT = performance.now()
      anim.current.vx = 0

      try {
        slider.setPointerCapture && slider.setPointerCapture(e.pointerId)
      } catch {}

      const prev = slider.style.scrollBehavior
      slider.dataset.prevScrollBehavior = prev
      slider.style.scrollBehavior = 'auto'
      // 터치는 기본동작을 막지 않습니다. touch-action CSS로 제어합니다.
      return
    }

    // 마우스/펜
    isPressingRef.current = true
    isDraggingRef.current = false

    if (anim.current.inertId) cancelAnimationFrame(anim.current.inertId)
    anim.current.inertId = 0

    drag.current.isDown = true
    anim.current.dragging = true
    drag.current.startX = e.clientX
    drag.current.startLeft = slider.scrollLeft
    anim.current.lastX = e.clientX
    anim.current.lastT = performance.now()
    anim.current.vx = 0

    try {
      slider.setPointerCapture && slider.setPointerCapture(e.pointerId)
    } catch {}

    const prev = slider.style.scrollBehavior
    slider.dataset.prevScrollBehavior = prev
    slider.style.scrollBehavior = 'auto'
    e.preventDefault()
  }

  const handleInteractionMove = (e) => {
    const slider = sliderRef.current
    if (!slider || !drag.current.isDown || !isPressingRef.current) return

    // 마우스/펜에서는 기본동작 방지로 선택 방지 및 스크롤 제어
    if (e.pointerType !== 'touch') e.preventDefault()

    const x = e.clientX || 0
    const t = performance.now()
    const dx = x - (drag.current.startX || 0)

    if (exceededDragThreshold(dx, dragThreshold)) isDraggingRef.current = true

    const instDx = x - (anim.current.lastX || x)
    const dt = Math.max(1, t - (anim.current.lastT || t))
    const vx = instDx / dt
    anim.current.vx = anim.current.vx * 0.85 + vx * 0.15

    anim.current.nextLeft = (drag.current.startLeft || 0) - dx
    if (!anim.current.pending) {
      anim.current.pending = true
      anim.current.rafId = requestAnimationFrame(() => {
        slider.scrollLeft = anim.current.nextLeft
        // 드래그 중에도 인덱스를 동기화
        updateIndexFromLeft(anim.current.nextLeft, itemStride, itemsLength)
        anim.current.pending = false
      })
    }

    anim.current.lastX = x
    anim.current.lastT = t
  }

  const handleInteractionEndTouch = (e) => {
    const slider = sliderRef.current
    if (!slider) return
    // 거리/시간 기준으로 탭 vs 드래그 판정
    const dx = Math.abs((e.clientX ?? 0) - (touchTap.current.x ?? 0))
    const dy = Math.abs((e.clientY ?? 0) - (touchTap.current.y ?? 0))
    const dt = performance.now() - (touchTap.current.t ?? 0)
    const isTap = dx <= tapDistance && dy <= tapDistance && dt <= tapTime && !isDraggingRef.current

    // 공통 종료 처리
    drag.current.isDown = false
    anim.current.dragging = false
    isPressingRef.current = false

    try {
      slider.releasePointerCapture && slider.releasePointerCapture(e.pointerId)
    } catch {}

    const prev = slider.dataset.prevScrollBehavior
    if (prev !== undefined) slider.style.scrollBehavior = prev

    if (isTap) {
      const href = resolveHrefFromEvent(e)
      if (href) navigate(href)
      isDraggingRef.current = false
      return
    }

    // 드래그였다면 관성 스크롤
    runInertia()
    isDraggingRef.current = false
  }

  const runInertia = () => {
    const slider = sliderRef.current
    if (!slider) return
    let vx = anim.current.vx
    const decay = 0.95
    const minV = 0.02
    if (Math.abs(vx) > minV) {
      const step = () => {
        anim.current.nextLeft = slider.scrollLeft - vx * 16
        slider.scrollLeft = anim.current.nextLeft
        // 관성 스크롤 중에도 인덱스를 동기화
        updateIndexFromLeft(anim.current.nextLeft, itemStride, itemsLength)
        vx *= decay
        if (Math.abs(vx) > minV && !anim.current.dragging) {
          anim.current.inertId = requestAnimationFrame(step)
        } else {
          anim.current.inertId = 0
        }
      }
      anim.current.inertId = requestAnimationFrame(step)
    }
  }

  const handleInteractionEndMousePen = (e) => {
    const slider = sliderRef.current
    if (!slider) return

    const dxMouse = Math.abs((e.clientX ?? 0) - (drag.current.startX ?? 0))
    const isClick = !isDraggingRef.current && dxMouse <= dragThreshold

    drag.current.isDown = false
    anim.current.dragging = false
    isPressingRef.current = false

    try {
      slider.releasePointerCapture && slider.releasePointerCapture(e.pointerId)
    } catch {}

    const prev = slider.dataset.prevScrollBehavior
    if (prev !== undefined) slider.style.scrollBehavior = prev

    if (isClick) {
      const href = resolveHrefFromEvent(e)
      if (href) {
        navigate(href)
        isDraggingRef.current = false
        return
      }
    }

    runInertia()
    isDraggingRef.current = false
  }

  const onPointerDown = (e) => handleInteractionStart(e)
  const onPointerMove = (e) => handleInteractionMove(e)
  const onPointerUp = (e) => {
    const slider = sliderRef.current
    if (!slider) return
    if (e.pointerType === 'touch') return handleInteractionEndTouch(e)
    return handleInteractionEndMousePen(e)
  }

  const onPointerLeave = () => {
    drag.current.isDown = false
    anim.current.dragging = false
    isPressingRef.current = false
    // 여기서는 isDraggingRef를 리셋하지 않습니다. 클릭 가드(onClickCapture)에서 다음 프레임에 리셋하도록 남겨 둡니다.
  }

  const onPointerCancel = () => {
    drag.current.isDown = false
    anim.current.dragging = false
    isPressingRef.current = false
    isDraggingRef.current = false
  }

  const onClickCapture = (e) => {
    if (isDraggingRef.current) {
      e.preventDefault()
      e.stopPropagation()
      requestAnimationFrame(() => { isDraggingRef.current = false })
    }
  }

  return {
    sliderRef,
    current,
    next: () => handleDotClick((current + 1) % (itemsLength || 1)),
    prev: () => handleDotClick((current - 1 + (itemsLength || 1)) % (itemsLength || 1)),
    goTo: (idx) => handleDotClick(idx),
    itemStride,
    gap,
    padOn,
    setPadOn,
    handleDotClick,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave,
      onPointerCancel,
      onClickCapture,
    },
  }
}
