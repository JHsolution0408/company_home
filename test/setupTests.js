import '@testing-library/jest-dom'

// 전역 레이아웃/타이밍 모킹 (JSDOM 한계 보완)
beforeAll(() => {
  // 1) getComputedStyle.gap 모킹 (기본 30px)
  const originalGetComputedStyle = window.getComputedStyle
  jest.spyOn(window, 'getComputedStyle').mockImplementation((el) => {
    const style = originalGetComputedStyle(el)
    return new Proxy(style, {
      get(target, prop, receiver) {
        if (prop === 'gap' || prop === 'columnGap') return '30px'
        if (prop === 'scrollBehavior') return target.scrollBehavior || 'auto'
        return Reflect.get(target, prop, receiver)
      },
    })
  })

  // 2) 전역 기본 offsetWidth 설정: 컴포넌트 마운트 시 stride 계산이 0이 되지 않도록 함
  // JSDOM 기본 getter가 0을 반환하더라도 항상 오버라이드하여 100을 반환하게 함
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() {
      // 테스트별로 개별 요소에 정의된 getter가 있으면 그것이 우선합니다.
      return 100
    },
  })

  // 3) requestAnimationFrame 모킹: 즉시(타이머) 실행
  if (!global.requestAnimationFrame) {
    global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0)
  }
  if (!global.cancelAnimationFrame) {
    global.cancelAnimationFrame = (id) => clearTimeout(id)
  }
})

// HTMLElement의 측정 속성 유틸
export const setNumericStyle = (el, map) => {
  Object.entries(map).forEach(([key, value]) => {
    Object.defineProperty(el, key, { configurable: true, get: () => value })
  })
}
