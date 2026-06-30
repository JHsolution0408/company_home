import * as React from 'react'
import { navigate } from 'gatsby'
import {
  exceededDragThreshold,
  DEFAULT_DRAG_THRESHOLD,
  DEFAULT_TAP_DISTANCE,
  DEFAULT_TAP_TIME,
} from '../../utils/slider'

/**
 * useSliderPointer
 *
 * 포인터(터치/마우스/펜) 입력만 담당. 터치는 네이티브 스크롤에 위임하고
 * 마우스/펜은 수동 scrollLeft 갱신 + 관성 트리거. 탭/클릭과 드래그를 구분해
 * 드래그 중에는 링크 네비게이션(`navigate`)을 차단한다.
 */
export function useSliderPointer({
  sliderRef,
  itemStride,
  itemsLength,
  anim,
  dragThreshold = DEFAULT_DRAG_THRESHOLD,
  tapDistance = DEFAULT_TAP_DISTANCE,
  tapTime = DEFAULT_TAP_TIME,
  getHrefFromEvent,
  updateIndexFromLeft,
  runInertia,
}) {
  const drag = React.useRef({ isDown: false, startX: 0, startLeft: 0 })
  const touchTap = React.useRef({ x: 0, y: 0, t: 0 })
  // 명시적 상호작용 상태
  const isPressingRef = React.useRef(false)
  const isDraggingRef = React.useRef(false)
  // 해당 press 사이클 동안 한 번이라도 드래그 판정이 되었는지 추적 (레이스 방지용)
  const hadDraggedRef = React.useRef(false)
  // 해당 press 사이클 동안 포인터 이동이 1회라도 발생했는지
  const movedThisPressRef = React.useRef(false)

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

  // 터치 포인터 업 시 탭/드래그를 판정하고 공통 종료 처리 (관성은 네이티브에 위임)
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
    isDraggingRef.current = false
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

  const onPointerDown = (e) => handleInteractionStart(e)
  const onPointerMove = (e) => handleInteractionMove(e)

  const onPointerUp = (e) => {
    const slider = sliderRef.current
    if (!slider) return

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

  // 외부(orchestrator)에서 dot 클릭 직전에 드래그 갱신 RAF를 정리할 수 있도록 노출
  const cancelDragRaf = () => {
    if (anim.current.rafId) {
      cancelAnimationFrame(anim.current.rafId)
      anim.current.rafId = 0
      anim.current.pending = false
    }
  }

  return {
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave,
      onPointerCancel,
      onClickCapture,
    },
    cancelDragRaf,
  }
}
