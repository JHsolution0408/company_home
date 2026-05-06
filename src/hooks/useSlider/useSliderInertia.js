/**
 * useSliderInertia
 *
 * 마우스/펜 드래그 종료 후 잔여 속도(anim.vx)를 기반으로 감속 스크롤을 수행하는 관성 애니메이션.
 * 매 프레임 `updateIndex`를 호출해 dot 인디케이터가 관성 진행 중에도 동기화되도록 한다.
 * iOS Safari 충돌 방지를 위해 호출부(터치 종료 핸들러)에서는 호출하지 않는다.
 */
export function useSliderInertia({ sliderRef, anim, updateIndex }) {
  // 드래그 종료 후 잔여 속도를 기반으로 감속하며 스크롤하는 관성 애니메이션 실행
  const runInertia = () => {
    const slider = sliderRef.current
    if (!slider) return

    let vx = anim.current.vx
    const decay = 0.95
    const minV = 0.02

    const hasInitialVelocity = Math.abs(vx) > minV
    if (!hasInitialVelocity) return

    const step = () => {
      anim.current.nextLeft = slider.scrollLeft - vx * 16
      slider.scrollLeft = anim.current.nextLeft
      // 관성 스크롤 중에도 인덱스를 동기화
      updateIndex(anim.current.nextLeft)
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

  // 진행 중인 관성 RAF를 즉시 취소
  const stopInertia = () => {
    if (anim.current.inertId) {
      cancelAnimationFrame(anim.current.inertId)
      anim.current.inertId = 0
    }
  }

  return { runInertia, stopInertia }
}
