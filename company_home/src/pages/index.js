import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

// CSS for hiding scrollbar
const hideScrollbarCSS = `
  .slider-hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`

const IndexPage = () => {
  const sliderRef = React.useRef(null)
  const sliderRef3 = React.useRef(null)
  const sliderRef4 = React.useRef(null)
  const [isAutoScrolling, setIsAutoScrolling] = React.useState(true)
  const [currentSlide, setCurrentSlide] = React.useState(1)
  const totalSlides = 3
  const [currentSlide3, setCurrentSlide3] = React.useState(1)
  const totalSlides3 = 6
  const [currentSlide4, setCurrentSlide4] = React.useState(1)
  const totalSlides4 = 6

  React.useEffect(() => {
    if (!isAutoScrolling || !sliderRef.current) return

    const interval = setInterval(() => {
      const containerWidth = sliderRef.current.offsetWidth
      const scrollAmount = containerWidth + 30
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
      setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1))
    }, 2000)

    return () => clearInterval(interval)
  }, [isAutoScrolling])

  const handlePrevClick = () => {
    setIsAutoScrolling(false)
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth
      const scrollAmount = containerWidth + 30
      sliderRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })
      setCurrentSlide((prev) => (prev === 1 ? totalSlides : prev - 1))
    }
    setTimeout(() => setIsAutoScrolling(true), 2000)
  }

  const handleNextClick = () => {
    setIsAutoScrolling(false)
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth
      const scrollAmount = containerWidth + 30
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
      setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1))
    }
    setTimeout(() => setIsAutoScrolling(true), 2000)
  }

  const handleDashClick = (index) => {
    if (sliderRef3.current) {
      const cardWidth = sliderRef3.current.offsetWidth / 4
      const gapWidth = 30
      const scrollAmount = (index - 1) * (cardWidth + gapWidth)
      sliderRef3.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
      setCurrentSlide3(index)
    }
  }

  const handleDashClick4 = (index) => {
    if (sliderRef4.current) {
      const cardWidth = sliderRef4.current.offsetWidth / 4
      const gapWidth = 30
      const scrollAmount = (index - 1) * (cardWidth + gapWidth)
      sliderRef4.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
      setCurrentSlide4(index)
    }
  }

  return (
  <Layout>
    <style>{hideScrollbarCSS}</style>
    {/* ========== HEADER ========== */}
    <header style={{ width: "100%", boxSizing: "border-box", margin: 0 }}>
      {/* GNB */}
      <div style={{ backgroundColor: "#003d99", color: "white", padding: "40px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* GNB 콘텐츠 */}
        </div>
      </div>

      {/* Header Content */}
      <div style={{ backgroundColor: "#ffffff", color: "#333", padding: "40px 20px" }}>
        <div style={{ maxWidth: "85%", margin: "0 auto" }}>
          {/* Header 콘텐츠 */}
        </div>
      </div>
    </header>

    {/* ========== BODY (5 SECTIONS) ========== */}
    <main style={{ width: "100%", boxSizing: "border-box", margin: 0 }}>
      {/* Section 1: Hero Slider */}
      <div style={{ padding: "0 20px", backgroundColor: "#f0f8ff" }}>
        <div style={{ maxWidth: "85%", margin: "0 auto" }}>
          <div 
            ref={sliderRef}
            className="slider-hide-scrollbar"
            style={{ 
              display: "flex", 
              gap: "30px", 
              overflowX: "auto", 
              overflowY: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: "20px", 
              scrollBehavior: "smooth",
              userSelect: "none"
            }}
          >
            {/* Card 1 */}
            <div style={{ minWidth: "100%", padding: "30px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#ffffff", textAlign: "left", flex: "0 0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "22px" }}>Hyper-scale AI for Net-zero</h3>
              <p style={{ color: "#333", marginBottom: "15px", fontSize: "16px", fontWeight: "bold" }}>
                초거대 AI가 여는 탄소중립의 미래
              </p>
              <p style={{ color: "#666", marginBottom: "30px", fontSize: "15px" }}>
                가장 완벽한 에너지 최적화의 실현
              </p>
              <div>
                <Link to="/solutions/web" style={{ color: "white", backgroundColor: "#0066cc", padding: "10px 25px", borderRadius: "4px", textDecoration: "none", fontWeight: "bold", fontSize: "14px", display: "inline-block", transition: "background-color 0.3s ease" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#0052a3"} onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}>
                  자세히 보기 &gt;
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{ minWidth: "100%", padding: "30px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#ffffff", textAlign: "left", flex: "0 0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "22px" }}>Beyond Data, Integration of Engineering</h3>
              <p style={{ color: "#333", marginBottom: "15px", fontSize: "16px", fontWeight: "bold" }}>
                데이터의 한계를 넘는 공학적 통찰
              </p>
              <p style={{ color: "#666", marginBottom: "30px", fontSize: "15px" }}>
                현장의 난제를 꿰뚫는 AI 와 시뮬레이션의 혁신적 융합
              </p>
              <div>
                <Link to="/solutions/mobile" style={{ color: "white", backgroundColor: "#0066cc", padding: "10px 25px", borderRadius: "4px", textDecoration: "none", fontWeight: "bold", fontSize: "14px", display: "inline-block", transition: "background-color 0.3s ease" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#0052a3"} onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}>
                  자세히 보기 &gt;
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ minWidth: "100%", padding: "30px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#ffffff", textAlign: "left", flex: "0 0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "22px" }}>Proven Success, Trusted Partner</h3>
              <p style={{ color: "#333", marginBottom: "15px", fontSize: "16px", fontWeight: "bold" }}>
                데이터로 증명하는 압도적 효율
              </p>
              <p style={{ color: "#666", marginBottom: "30px", fontSize: "15px" }}>
                비즈니스 성공을 위한 검증된 파트너
              </p>
              <div>
                <Link to="/solutions/cloud" style={{ color: "white", backgroundColor: "#0066cc", padding: "10px 25px", borderRadius: "4px", textDecoration: "none", fontWeight: "bold", fontSize: "14px", display: "inline-block", transition: "background-color 0.3s ease" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#0052a3"} onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}>
                  자세히 보기 &gt;
                </Link>
              </div>
            </div>
          </div>

          {/* Slider Controls - Below Cards */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "20px", paddingBottom: "20px" }}>
            <button 
              onClick={handlePrevClick}
              style={{
                backgroundColor: "#0066cc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "8px 12px",
                fontSize: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#0052a3"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}
            >
              {'<'}
            </button>
            
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#333", minWidth: "60px", textAlign: "center" }}>
              {currentSlide} / {totalSlides}
            </div>
            
            <button 
              onClick={handleNextClick}
              style={{
                backgroundColor: "#0066cc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "8px 12px",
                fontSize: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#0052a3"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: About Company */}
      <div style={{ padding: "60px 20px" }}>
        <div style={{ maxWidth: "85%", margin: "0 auto" }}>
        
        <div style={{ padding: "40px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "left" }}>
          <h3 style={{ color: "#0066cc", marginBottom: "20px", fontSize: "24px" }}>JHAION Engine : The Core of Optimization</h3>
          <p style={{ color: "#666", marginBottom: "20px", fontSize: "16px", lineHeight: "1.8" }}>
            Net-Zero와 최적화를 향한 초거대 AI의 여정
            <br />
            Journey of Hyper-scale + AI + Optimization + Net-zero
          </p>
        </div>
        </div>
      </div>

      {/* Section 3: Solutions Slider */}
      <div style={{ backgroundColor: "#ffffff", padding: "60px 20px", borderTop: "1px solid #e0e0e0" }}>
        <div style={{ maxWidth: "85%", margin: "0 auto" }}>
          <h2 style={{ textAlign: "left", marginBottom: "15px", fontSize: "28px", color: "#003d99" }}>데이터 공학으로 완성된 <br /> JH솔루션의 통합플랫폼을 경험하세요</h2>
          <p style={{ textAlign: "left", marginBottom: "40px", fontSize: "15px", color: "#666", lineHeight: "1.8" }}>에너지 소비패턴을 예측하고, AI가 CFD 시뮬레이션을 학습하여 최적의 운영환경을 자동 설계합니다.</p>
          
          <div ref={sliderRef3} style={{ display: "flex", gap: "30px", overflowX: "auto", paddingBottom: "20px", scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }} className="slider-hide-scrollbar">
            {/* Card 1: JHAION 엔진 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "20px" }}>JHAION 엔진</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  초거대 AI 기술을 통한 에너지 최적화 엔진입니다.
                </p>
              </div>
              <div style={{ height: "200px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "60px", order: 2 }}>
                ⚙️
              </div>
            </div>

            {/* Card 2: 에너지 관리 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "20px" }}>에너지 관리</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  에너지 소비를 실시간으로 모니터링하고 최적화합니다.
                </p>
              </div>
              <div style={{ height: "200px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "60px", order: 2 }}>
                ⚡
              </div>
            </div>

            {/* Card 3: 시뮬레이션 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "20px" }}>시뮬레이션</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  CFD 기반 고도의 시뮬레이션 기술입니다.
                </p>
              </div>
              <div style={{ height: "200px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "60px", order: 2 }}>
                📊
              </div>
            </div>

            {/* Card 4: 인공지능 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "20px" }}>인공지능</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  머신러닝 기반의 지능형 솔루션입니다.
                </p>
              </div>
              <div style={{ height: "200px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "60px", order: 2 }}>
                🤖
              </div>
            </div>

            {/* Card 5: 디지털 트윈 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "20px" }}>디지털 트윈</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  현실의 정확한 가상 모델링입니다.
                </p>
              </div>
              <div style={{ height: "200px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "60px", order: 2 }}>
                👥
              </div>
            </div>

            {/* Card 6: 미디어 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "20px" }}>미디어</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  멀티미디어 기반의 통합 플랫폼입니다.
                </p>
              </div>
              <div style={{ height: "200px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "60px", order: 2 }}>
                📱
              </div>
            </div>
          </div>

          {/* Slider Indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px", paddingBottom: "20px" }}>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <button
                key={index}
                onClick={() => handleDashClick(index)}
                style={{
                  width: "10px",
                  height: "3px",
                  backgroundColor: index === currentSlide3 ? "#0052a3" : "#0066cc",
                  borderRadius: "2px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  opacity: index === currentSlide3 ? 1 : 0.6,
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Press & News Slider */}
      <div style={{ backgroundColor: "#f9f9f9", padding: "60px 20px", borderTop: "1px solid #e0e0e0" }}>
        <div style={{ maxWidth: "85%", margin: "0 auto" }}>
          <h2 style={{ textAlign: "left", marginBottom: "15px", fontSize: "28px", color: "#003d99" }}>산업의 변화와 흐름을 주도하는 <br /> JH솔루션의 새로운 소식을 만나보세요</h2>
          <p style={{ textAlign: "left", marginBottom: "40px", fontSize: "15px", color: "#666", lineHeight: "1.8" }}>언론이 주목한 혁신 기술부터 최신 프로젝트 수주까지, JH 솔루션이 창출하는 가치를 생생하게 전달합니다</p>
          
          <div ref={sliderRef4} style={{ display: "flex", gap: "30px", overflowX: "auto", paddingBottom: "20px", scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }} className="slider-hide-scrollbar">
            {/* News Card 1 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <p style={{ color: "#999", fontSize: "12px", marginBottom: "10px" }}>2024.12.01</p>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "18px" }}>JH솔루션 신제품 출시</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  차세대 AI 기반 에너지 최적화 솔루션이 출시되었습니다.
                </p>
              </div>
              <div style={{ height: "150px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", order: 2 }}>
                📰
              </div>
            </div>

            {/* News Card 2 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <p style={{ color: "#999", fontSize: "12px", marginBottom: "10px" }}>2024.11.25</p>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "18px" }}>업계 최고 효율 달성</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  Net-zero 목표 달성에 업계 최고의 에너지 효율을 기록했습니다.
                </p>
              </div>
              <div style={{ height: "150px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", order: 2 }}>
                🏆
              </div>
            </div>

            {/* News Card 3 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <p style={{ color: "#999", fontSize: "12px", marginBottom: "10px" }}>2024.11.20</p>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "18px" }}>국제 컨퍼런스 참가</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  글로벌 에너지 최적화 컨퍼런스에서 주요 발표를 진행했습니다.
                </p>
              </div>
              <div style={{ height: "150px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", order: 2 }}>
                🌍
              </div>
            </div>

            {/* News Card 4 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <p style={{ color: "#999", fontSize: "12px", marginBottom: "10px" }}>2024.11.15</p>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "18px" }}>파트너십 체결</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  주요 에너지 기업과의 전략적 파트너십을 체결했습니다.
                </p>
              </div>
              <div style={{ height: "150px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", order: 2 }}>
                🤝
              </div>
            </div>

            {/* News Card 5 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <p style={{ color: "#999", fontSize: "12px", marginBottom: "10px" }}>2024.11.10</p>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "18px" }}>기술 특허 등록</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  혁신적인 AI 시뮬레이션 기술이 국제 특허로 등록되었습니다.
                </p>
              </div>
              <div style={{ height: "150px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", order: 2 }}>
                💡
              </div>
            </div>

            {/* News Card 6 */}
            <div style={{ border: "2px solid #0066cc", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", flex: "0 0 calc(25% - 22.5px)", minWidth: "280px" }}>
              <div style={{ padding: "30px", textAlign: "left", order: 1 }}>
                <p style={{ color: "#999", fontSize: "12px", marginBottom: "10px" }}>2024.11.05</p>
                <h3 style={{ color: "#0066cc", marginBottom: "15px", fontSize: "18px" }}>고객 사례 발표</h3>
                <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
                  주요 고객사의 성공 사례를 발표하고 결과를 공유했습니다.
                </p>
              </div>
              <div style={{ height: "150px", backgroundColor: "#e8f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", order: 2 }}>
                ✨
              </div>
            </div>
          </div>

          {/* Slider Indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px", paddingBottom: "20px" }}>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <button
                key={index}
                onClick={() => handleDashClick4(index)}
                style={{
                  width: "10px",
                  height: "3px",
                  backgroundColor: index === currentSlide4 ? "#0052a3" : "#0066cc",
                  borderRadius: "2px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  opacity: index === currentSlide4 ? 1 : 0.6,
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: CTA */}
      <div style={{ padding: "60px 20px" }}>
        <div style={{ maxWidth: "85%", margin: "0 auto" }}>
          <div style={{ padding: "40px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "left" }}>
            <h2 style={{ color: "#003d99", marginBottom: "20px", fontSize: "24px" }}>지능형 운영의 첫걸음<br />JH 솔루션이 함께 합니다.</h2>
            <p style={{ color: "#666", marginBottom: "30px", fontSize: "16px", lineHeight: "1.8" }}>
              검증된 노하우와 최신 기술을 바탕으로 데이터를 분석해 최적의 솔루션을 제안합니다.
            </p>
            <Link to="/contact" style={{ color: "white", backgroundColor: "#0066cc", padding: "12px 30px", borderRadius: "4px", textDecoration: "none", fontWeight: "bold", fontSize: "16px", display: "inline-block", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#0052a3"} onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}>
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </main>

  </Layout>
  )
}

export const Head = () => <Seo title="홈" />

export default IndexPage
