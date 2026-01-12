import * as React from 'react'
import { navigate } from 'gatsby'
import {
  exceededDragThreshold,
  DEFAULT_DRAG_THRESHOLD,
  DEFAULT_TAP_DISTANCE,
  DEFAULT_TAP_TIME
} from '../utils/slider'

/**
 * useSlider
 * 
 * ref를 전달받아 무한 스크롤을 지원하는 슬라이더.
 * 이동 임계값을 사용해 드래그와 터치를 구분하여 링크 이동 또는 슬라이더 드래그 동작을 수행합니다.
 */
export function useSlider({
  ref,                 // 스크롤 컨테이너에 대한 외부 React ref (필수)
  itemsLength,         // 슬라이드될 아이템 개수 (필수)
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
  // 해당 press 사이클 동안 한 번이라도 드래그 판정이 되었는지 추적 (레이스 방지용)
  const hadDraggedRef = React.useRef(false)
  // 해당 press 사이클 동안 포인터 이동이 1회라도 발생했는지
  const movedThisPressRef = React.useRef(false)

  // 인덱스 갱신: 연속 스크롤 좌표를 단일 계산 함수로 통합하고,
  // 같은 인덱스면 setState를 피해서 렌더를 최소화합니다.
  const currentRef = React.useRef(0)
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
  }, [itemsLength])

  // 도트(인디케이터) 클릭 시 가장 가까운 동일 인덱스 위치로 스크롤하고 상태를 갱신
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
  // 포인터 캡처 등으로 달라질 수 있는 이벤트 타깃에서 안전하게 링크 href를 추출
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
  // 포인터 다운 시(터치/마우스/펜) 드래그 준비 상태로 전환하고 필요한 캡처/스타일을 설정
  const handleInteractionStart = (e) => {
    const slider = sliderRef.current
    if (!slider) return

    // 새 press 사이클 시작 시 드래그 플래그 리셋
    hadDraggedRef.current = false

    if (e.pointerType === 'touch') {
      // 터치 시작: 탭 판정 기준 기록 + 드래그 준비 상태로 초기화
      touchTap.current = { x: e.clientX, y: e.clientY, t: performance.now() }
      isPressingRef.current = true
      isDraggingRef.current = false
      // 새 사이클 시작: 이동 플래그 초기화
      movedThisPressRef.current = false
      slider.dataset.moved = '0'

      if (anim.current.inertId) cancelAnimationFrame(anim.current.inertId)
      anim.current.inertId = 0

      drag.current.isDown = true
      anim.current.dragging = true
      drag.current.startX = e.clientX || 0
      drag.current.startLeft = slider.scrollLeft
      anim.current.lastX = e.clientX || 0
      anim.current.lastT = performance.now()
      anim.current.vx = 0

      // iOS Safari에서 네이티브 스크롤과 충돌을 피하기 위해 터치에서는 pointer capture를 사용하지 않음
      // try { slider.setPointerCapture && slider.setPointerCapture(e.pointerId) } catch {}

      const prev = slider.style.scrollBehavior
      slider.dataset.prevScrollBehavior = prev
      slider.style.scrollBehavior = 'auto'
      // 터치는 기본동작을 막지 않습니다. touch-action/CSS 설정에 위임합니다.
      return
    }

    // 마우스/펜
    isPressingRef.current = true
    isDraggingRef.current = false
    movedThisPressRef.current = false

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

  // 포인터 이동 시 드래그 거리/속도를 계산하여 스크롤 좌표를 갱신
  const handleInteractionMove = (e) => {
    const slider = sliderRef.current
    if (!slider || !drag.current.isDown || !isPressingRef.current) return

    // 마우스/펜에서는 기본동작 방지로 선택 방지 및 스크롤 제어
    if (e.pointerType !== 'touch') e.preventDefault()

    const x = e.clientX || 0
    const t = performance.now()
    const dx = x - (drag.current.startX || 0)

    // 미세 이동이라도 발생하면 클릭을 보수적으로 차단하기 위해 이동 플래그/드래그 플래그 세팅
    if (dx !== 0) {
      movedThisPressRef.current = true
      hadDraggedRef.current = true
    }

    if (exceededDragThreshold(dx, dragThreshold)) {
      isDraggingRef.current = true
    }

    const instDx = x - (anim.current.lastX || x)
    const dt = Math.max(1, t - (anim.current.lastT || t))
    const vx = instDx / dt
    anim.current.vx = anim.current.vx * 0.85 + vx * 0.15

    // 터치에서는 네이티브 스크롤에 위임하여 수동 스크롤 갱신을 하지 않습니다.
    if (e.pointerType !== 'touch') {
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
    }

    anim.current.lastX = x
    anim.current.lastT = t
  }

  // 터치 포인터 업 시 탭/드래그를 판정하고 공통 종료 처리 및 관성 스크롤 실행
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

    // 드래그였다면 네이티브(iOS) 관성에 위임하고 JS 관성은 호출하지 않습니다.
    // runInertia() 호출 제거: iOS Safari에서 네이티브 관성과 충돌 가능성 방지
    isDraggingRef.current = false
  }

  // 스와이프 효과
  // 드래그 종료 후 잔여 속도를 기반으로 감속하며 스크롤하는 관성 애니메이션 실행
  const runInertia = () => {
    const slider = sliderRef.current

    if (!slider) return

    let vx = anim.current.vx

    const decay = 0.95
    const minV = 0.02

    const hasInitialVelocity = Math.abs(vx) > minV

    if (hasInitialVelocity) {
      const step = () => {
        anim.current.nextLeft = slider.scrollLeft - vx * 16
        slider.scrollLeft = anim.current.nextLeft
        // 관성 스크롤 중에도 인덱스를 동기화
        updateIndexFromLeft(anim.current.nextLeft, itemStride, itemsLength)
        vx *= decay
        const stillHasVelocity = Math.abs(vx) > minV
        const shouldContinueInertia = stillHasVelocity && !anim.current.dragging
        
        if (shouldContinueInertia) {
          anim.current.inertId = requestAnimationFrame(step)
        } else {
          anim.current.inertId = 0
        }
      }
      anim.current.inertId = requestAnimationFrame(step)
    }
  }

  // 마우스/펜 포인터 업 시 클릭 여부를 판정하고 필요 시 링크 이동, 아니면 관성 스크롤 실행
  const handleInteractionEndMousePen = (e) => {
    const slider = sliderRef.current
    if (!slider) return

    const deltaLeft = Math.abs((slider.scrollLeft ?? 0) - (drag.current.startLeft ?? 0))
    const dxMouse = Math.abs((e.clientX ?? 0) - (drag.current.startX ?? 0))

    // 업 시점에서도 한 번 더 드래그 여부를 보수적으로 판정하여 클릭 오판정 방지
    if (dxMouse > dragThreshold || deltaLeft > dragThreshold) {
      hadDraggedRef.current = true
    }

    // 포인터가 한 번이라도 이동했다면(보수적) 클릭 네비게이션을 차단하고 관성만 처리
    if (movedThisPressRef.current || hadDraggedRef.current) {
      drag.current.isDown = false
      anim.current.dragging = false
      isPressingRef.current = false
      try {
        slider.releasePointerCapture && slider.releasePointerCapture(e.pointerId)
      } catch {}
      const prev = slider.dataset.prevScrollBehavior
      if (prev !== undefined) slider.style.scrollBehavior = prev
      runInertia()
      isDraggingRef.current = false
      movedThisPressRef.current = false
      hadDraggedRef.current = false
      return
    }

    // 클릭 판정 강화: 실제 스크롤 변위가 임계값 이하인 경우에만 클릭으로 간주
    const isClick = deltaLeft <= dragThreshold

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
        movedThisPressRef.current = false
        hadDraggedRef.current = false
        return
      }
    }

    runInertia()
    isDraggingRef.current = false
    movedThisPressRef.current = false
    hadDraggedRef.current = false
  }

  // 마우스 등을 누르고있을때
  const onPointerDown = (e) => handleInteractionStart(e);

  // 포인터 이동 시
  const onPointerMove = (e) => handleInteractionMove(e);

  // 마우스 등을 뗐을때
  const onPointerUp = (e) => {
    const slider = sliderRef.current

    if (!slider) {
      return;
    }

    if (e.pointerType === 'touch') {
      return handleInteractionEndTouch(e)
    }

    return handleInteractionEndMousePen(e)
  }

  // 포인터가 영역을 벗어나면 드래그/누름 상태를 해제
  const onPointerLeave = () => {
    drag.current.isDown = false
    anim.current.dragging = false
    isPressingRef.current = false
    // 여기서는 isDraggingRef를 리셋하지 않습니다. 클릭 가드(onClickCapture)에서 다음 프레임에 리셋하도록 남겨 둡니다.
  }

  // 포인터 취소(pointercancel) 시 모든 상호작용 상태를 안전하게 초기화
  const onPointerCancel = () => {
    drag.current.isDown = false
    anim.current.dragging = false
    isPressingRef.current = false
    isDraggingRef.current = false
  }

  // 드래그 중 클릭 이벤트를 가로채 링크 네비게이션 등 부작용을 방지
  const onClickCapture = (e) => {
    if (isDraggingRef.current || hadDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
      requestAnimationFrame(() => {
        isDraggingRef.current = false
        hadDraggedRef.current = false
      })
    }
  }

  return {
    sliderRef,
    current,
    next: () => handleDotClick((current + 1) % (itemsLength || 1)),
    // prev: () => handleDotClick((current - 1 + (itemsLength || 1)) % (itemsLength || 1)),
    // goTo: (idx) => handleDotClick(idx),
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
