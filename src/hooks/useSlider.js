import * as React from 'react'
import { navigate } from 'gatsby'
import { exceededDragThreshold, DEFAULT_DRAG_THRESHOLD, DEFAULT_TAP_DISTANCE, DEFAULT_TAP_TIME } from '../utils/slider'

/**
 * useSlider — reusable hook for horizontally scrolling, pseudo-infinite carousels built with duplicated tracks [A..N][A..N].
 *
 * Features:
 * - Accepts an external ref to the scroll container for flexibility.
 * - Computes item stride from first child width + CSS gap.
 * - Keeps scroll position in the middle set and normalizes at edges.
 * - Exposes current index within the original set [0..N-1].
 * - Robust drag (mouse/pen) vs tap (touch) separation, with inertia.
 * - Optional programmatic navigation on confirmed tap/click via getHrefFromEvent.
 * - Dot click helper to scroll to nearest candidate among replicated sets.
 */
export function useSlider({
  ref,                 // React ref to the scroll container (required)
  itemsLength,         // number of unique items in the set (required)
  dragThreshold = DEFAULT_DRAG_THRESHOLD,   // px threshold to consider as drag for mouse/pen
  tapDistance = DEFAULT_TAP_DISTANCE,       // px threshold for tap detection on touch
  tapTime = DEFAULT_TAP_TIME,               // ms threshold for tap detection
  onIndexChange,       // optional callback(idx)
  getHrefFromEvent,    // optional function(e) -> href string; if provided, hook calls navigate(href) on confirmed tap/click
}) {
  // Always create an internal ref unconditionally to satisfy Rules of Hooks.
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
  // Explicit interaction state
  const isPressingRef = React.useRef(false)
  const isDraggingRef = React.useRef(false)

  // Read gap/stride and place to the middle set on mount/update
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

    // Place at the start of the second set
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
      if (anim.current.dragging || anim.current.inertId) return
      if (isNormalizing.current) return

      // Normalize edges
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

      // Update index within original set [0..N-1]
      const rel = slider.scrollLeft % setWidth
      let idx = Math.round(rel / stride)
      if (idx >= itemsLength) idx = 0
      if (idx < 0) idx = 0
      setCurrent(idx)
      onIndexChange && onIndexChange(idx)
    }

    slider.addEventListener('scroll', onScroll)
    return () => slider.removeEventListener('scroll', onScroll)
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

  // Pointer handlers
  // Resolve href robustly, accounting for pointer capture retargeting
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

  // --- Internal interaction helpers using explicit state ---
  const handleInteractionStart = (e) => {
    const slider = sliderRef.current
    if (!slider) return

    if (e.pointerType === 'touch') {
      touchTap.current = { x: e.clientX, y: e.clientY, t: performance.now() }
      isPressingRef.current = true
      isDraggingRef.current = false
      return
    }

    // Mouse/Pen
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
    if (e.pointerType === 'touch') return
    const slider = sliderRef.current
    if (!slider || !drag.current.isDown || !isPressingRef.current) return

    e.preventDefault()
    const x = e.clientX
    const t = performance.now()
    const dx = x - drag.current.startX

    if (exceededDragThreshold(dx, dragThreshold)) isDraggingRef.current = true

    const instDx = x - anim.current.lastX
    const dt = Math.max(1, t - anim.current.lastT)
    const vx = instDx / dt
    anim.current.vx = anim.current.vx * 0.85 + vx * 0.15

    anim.current.nextLeft = drag.current.startLeft - dx
    if (!anim.current.pending) {
      anim.current.pending = true
      anim.current.rafId = requestAnimationFrame(() => {
        slider.scrollLeft = anim.current.nextLeft
        anim.current.pending = false
      })
    }

    anim.current.lastX = x
    anim.current.lastT = t
  }

  const handleInteractionEndTouch = (e) => {
    // Decide tap vs drag using distance/time
    const dx = Math.abs((e.clientX ?? 0) - (touchTap.current.x ?? 0))
    const dy = Math.abs((e.clientY ?? 0) - (touchTap.current.y ?? 0))
    const dt = performance.now() - (touchTap.current.t ?? 0)
    if (dx <= tapDistance && dy <= tapDistance && dt <= tapTime && !isDraggingRef.current) {
      const href = resolveHrefFromEvent(e)
      if (href) navigate(href)
    }
    isPressingRef.current = false
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
    // do not reset isDraggingRef here to allow click guard to catch it; it will reset on next frame in click guard
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
