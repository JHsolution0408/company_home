import '@testing-library/jest-dom'

// JSDOM 기본 크기/스타일 모킹
beforeAll(() => {
  // getComputedStyle.gap 모킹 (기본 30px)
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

  // requestAnimationFrame 모킹: 즉시 실행
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
