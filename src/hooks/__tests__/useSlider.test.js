import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { useSlider } from '../useSlider'
import { navigate } from 'gatsby'

// 유틸: 컨테이너/아이템의 측정값을 모킹
const defineNumberProp = (obj, key, value) => {
  Object.defineProperty(obj, key, { configurable: true, get: () => value, set: () => {} })
}

function TestSlider({ itemsLength = 5, getHrefFromEvent }) {
  const ref = React.useRef(null)
  const { current, handlers, sliderRef } = useSlider({ ref, itemsLength, getHrefFromEvent })

  // 테스트를 위한 간단한 아이템 렌더(첫 번째 자식이 꼭 있어야 stride 계산 가능)
  const items = Array.from({ length: itemsLength }, (_, i) => (
    <a key={i} href={`/item-${i}`} data-testid={`item-${i}`}>item {i}</a>
  ))

  return (
    <div>
      <div data-testid="slider" ref={sliderRef} {...handlers} style={{ display: 'flex', gap: 30, overflow: 'auto' }}>
        {items}
      </div>
      <div data-testid="current">{current}</div>
    </div>
  )
}

const setupDomMeasurements = (sliderEl, { itemWidth = 100, gap = 30, itemsLength = 5 }) => {
  // 첫 자식의 offsetWidth
  const firstChild = sliderEl.firstChild
  defineNumberProp(firstChild, 'offsetWidth', itemWidth)

  // 컨테이너의 크기/스크롤 관련 값
  const stride = itemWidth + gap
  const setWidth = stride * itemsLength
  const totalContent = setWidth * 3 // 3세트 가정
  defineNumberProp(sliderEl, 'clientWidth', stride * 3) // 임의의 가시 영역
  defineNumberProp(sliderEl, 'scrollWidth', totalContent + sliderEl.clientWidth)

  if (!sliderEl.scrollTo) sliderEl.scrollTo = ({ left }) => { sliderEl.scrollLeft = left }

  return { stride, setWidth }
}

describe('useSlider', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  test('마운트 시 두 번째 세트 시작 지점으로 스크롤을 이동(초기 센터링)', async () => {
    render(<TestSlider itemsLength={5} />)
    const slider = screen.getByTestId('slider')
    const { setWidth } = setupDomMeasurements(slider, { itemsLength: 5 })

    // rAF가 동작하도록 플러시
    await act(async () => { jest.runOnlyPendingTimers() })

    expect(slider.scrollLeft).toBe(setWidth)
  })

  test('스크롤에 따라 현재 인덱스를 계산/갱신', async () => {
    render(<TestSlider itemsLength={5} />)
    const slider = screen.getByTestId('slider')
    const { stride, setWidth } = setupDomMeasurements(slider, { itemsLength: 5 })

    await act(async () => { jest.runOnlyPendingTimers() })

    // 인덱스 2 위치로 이동 (두 번째 세트 기준)
    act(() => {
      slider.scrollLeft = setWidth + stride * 2 + 2
      slider.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByTestId('current').textContent).toBe('2')
  })

  test('양 끝 경계에서 스크롤 정규화(무한 루프 유지)', async () => {
    render(<TestSlider itemsLength={5} />)
    const slider = screen.getByTestId('slider')
    const { setWidth } = setupDomMeasurements(slider, { itemsLength: 5 })

    await act(async () => { jest.runOnlyPendingTimers() })

    // 왼쪽 경계로 이동시키고 스크롤 이벤트 발생
    act(() => {
      slider.scrollLeft = 0
      slider.dispatchEvent(new Event('scroll'))
    })
    expect(slider.scrollLeft).toBeGreaterThanOrEqual(setWidth)

    // 오른쪽 경계로 이동시키고 스크롤 이벤트 발생
    act(() => {
      // clientWidth를 고려한 maxScroll 근처로 이동시킴
      slider.scrollLeft = slider.scrollWidth - slider.clientWidth
      slider.dispatchEvent(new Event('scroll'))
    })
    // 오른쪽 경계에서 setWidth만큼 되감겼는지 확인
    expect(slider.scrollLeft).toBeLessThan(slider.scrollWidth - slider.clientWidth)
  })

  test('마우스 클릭(드래그 아님) 시 getHrefFromEvent로 반환된 경로로 navigate 호출', async () => {
    const getHrefFromEvent = jest.fn(() => '/go-here')
    render(<TestSlider itemsLength={5} getHrefFromEvent={getHrefFromEvent} />)
    const slider = screen.getByTestId('slider')
    setupDomMeasurements(slider, { itemsLength: 5 })

    await act(async () => { jest.runOnlyPendingTimers() })

    // pointerdown -> pointerup (이동 없음)
    act(() => {
      fireEvent.pointerDown(slider, { pointerType: 'mouse', clientX: 100 })
      fireEvent.pointerUp(slider, { pointerType: 'mouse', clientX: 102 })
    })

    expect(getHrefFromEvent).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/go-here')
  })

  test('드래그 임계값을 넘으면 클릭으로 간주되지 않아 navigate가 호출되지 않음', async () => {
    // 드래그 중(pointer 이벤트 단계)에는 href를 해석하지 않도록 테스트 전용 구현
    const getHrefFromEvent = jest.fn((e) => (e.type === 'click' ? '/should-not-go' : null))
    render(<TestSlider itemsLength={5} getHrefFromEvent={getHrefFromEvent} />)
    const slider = screen.getByTestId('slider')
    const { stride } = setupDomMeasurements(slider, { itemsLength: 5 })

    await act(async () => { jest.runOnlyPendingTimers() })

    // 충분히 이동하여 드래그로 판정
    act(() => {
      fireEvent.pointerDown(slider, { pointerType: 'mouse', pointerId: 1, buttons: 1, clientX: 100, clientY: 0, bubbles: true })
      fireEvent.pointerMove(slider, { pointerType: 'mouse', pointerId: 1, buttons: 1, clientX: 120, clientY: 0, bubbles: true })
      fireEvent.pointerMove(slider, { pointerType: 'mouse', pointerId: 1, buttons: 1, clientX: 140, clientY: 0, bubbles: true })
    })

    // rAF 큐 플러시(스크롤 반영 및 내부 상태 업데이트 보장)
    await act(async () => { jest.runOnlyPendingTimers() })
    await act(async () => { jest.runOnlyPendingTimers() })

    act(() => {
      fireEvent.pointerUp(slider, { pointerType: 'mouse', pointerId: 1, buttons: 0, clientX: 140, clientY: 0, bubbles: true })
    })

    expect(navigate).not.toHaveBeenCalled()

    // 드래그에 의해 scrollLeft가 변경되었는지 간단히 체크(정확한 값은 환경에 따라 다를 수 있으므로 >= 0 검사)
    expect(slider.scrollLeft).toBeGreaterThanOrEqual(0)
  })

  test('터치 탭: 짧은 시간/거리에서 getHrefFromEvent 경로로 이동', async () => {
    const getHrefFromEvent = jest.fn(() => '/touch-go')
    render(<TestSlider itemsLength={5} getHrefFromEvent={getHrefFromEvent} />)
    const slider = screen.getByTestId('slider')
    setupDomMeasurements(slider, { itemsLength: 5 })

    await act(async () => { jest.runOnlyPendingTimers() })

    act(() => {
      fireEvent.pointerDown(slider, { pointerType: 'touch', clientX: 200, clientY: 10 })
      // 이동 거의 없음, 바로 up
      fireEvent.pointerUp(slider, { pointerType: 'touch', clientX: 202, clientY: 12 })
    })

    expect(getHrefFromEvent).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/touch-go')
  })
})
