
import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const cards = [
  {
    title: "Hyper-scale AI for Net-zero",
    subtitle1: "초거대 AI가 여는 탄소중립의 미래",
    subtitle2: "가장 완벽한 에너지 최적화의 실현",
    link: "/company/vision-mission",
    image: "/images/main-1.jpg"
  },
  {
    title: "Beyond Data, Integration of Engineering",
    subtitle1: "데이터의 한계를 넘는 공학적 통찰",
    subtitle2: "현장의 난제를 꿰뚫는 AI와 시뮬레이션의 혁신적 융합",
    link: "/company/jhaion-background",
    image: "/images/main-2.png"
  },
  {
    title: "Proven Success, Trusted Partner",
    subtitle1: "데이터로 증명하는 압도적 효율",
    subtitle2: "비즈니스 성공을 위한 검증된 파트너십",
    link: "/company/partners",
    image: "/images/main-3..png"
  }
];

// CSS for hiding scrollbar
const hideScrollbarCSS = `
  .slider-hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`

const IndexPage = ({ data }) => {
    // 자동 롤링 타이머
    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrent(prev => (prev + 1) % cards.length);
      }, 5000);
      return () => clearInterval(timer);
    }, [cards.length]);
  const pressReleases = data.allMarkdownRemark.nodes
  const [current, setCurrent] = React.useState(0);
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
    const slider = sliderRef.current
    if (!slider) return

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft
      const containerWidth = slider.offsetWidth
      const slideIndex = Math.round(scrollLeft / (containerWidth + 30)) + 1
      setCurrentSlide(slideIndex > totalSlides ? totalSlides : slideIndex < 1 ? 1 : slideIndex)
    }

    slider.addEventListener('scroll', handleScroll)
    return () => slider.removeEventListener('scroll', handleScroll)
  }, [])

  // 제품 카드 자동 롤링
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef3.current) {
        const cardWidth = sliderRef3.current.firstChild.offsetWidth;
        const gap = 30;
        sliderRef3.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 자동 롤링 완전히 제거됨

  const handlePrevClick = () => {
    setIsAutoScrolling(false)
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth;
      const gapWidth = 10;
      const scrollAmount = cardWidth + gapWidth;
      sliderRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })
    }
    setTimeout(() => setIsAutoScrolling(true), 2000)
  }

  const handleNextClick = () => {
    setIsAutoScrolling(false)
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth;
      const gapWidth = 10;
      const scrollAmount = cardWidth + gapWidth;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
    setTimeout(() => setIsAutoScrolling(true), 2000)
  }

  const handleDashClick = (index) => {
    if (sliderRef3.current) {
      const cardWidth = sliderRef3.current.offsetWidth;
      const gapWidth = 10;
      const scrollAmount = (index - 1) * (cardWidth + gapWidth);
      sliderRef3.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setCurrentSlide3(index);
    }
  }

  const handleDashClick4 = (index) => {
    if (sliderRef4.current) {
      const cardWidth = sliderRef4.current.offsetWidth;
      const gapWidth = 10;
      const scrollAmount = (index - 1) * (cardWidth + gapWidth);
      sliderRef4.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setCurrentSlide4(index);
    }
  }

  return (
  <Layout>
    <style>{hideScrollbarCSS}</style>
    <style>{`body { max-width: 100% !important; }`}</style>
    {/* ========== HEADER ========== */}
    <header style={{ width: "100vw", boxSizing: "border-box", margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* GNB */}
      <div style={{ backgroundColor: "#FDFDFD", color: "white", padding: "10px 2vw" }}>
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
          {/* GNB 콘텐츠 */}
        </div>
      </div>

      {/* Header Content */}
      <div style={{ backgroundColor: "#ffffff", color: "#333", padding: "1px 2vw" }}>
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
          {/* Header 콘텐츠 */}
        </div>
      </div>
    </header>

    {/* ========== BODY (5 SECTIONS) ========== */}
    <main style={{ width: "100vw", boxSizing: "border-box", margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Section 1: Hero Slider */}
      <div style={{ width: '90vw', maxWidth: '90vw', overflow: 'hidden', position: 'relative', margin: '0 auto', background: '#fff' }}>
        <div style={{ display: 'flex', transition: 'transform 0.5s', transform: `translateX(-${current * 90}vw)`, width: '90vw', maxWidth: '90vw', height: '600px', background: '#fff', paddingBottom: '32px' }}>
          {cards.map((card, idx) => (
            <div key={idx} style={{ flex: '0 0 100%', minWidth: '100%', maxWidth: '100%', height: '100%', padding: 'clamp(16px,1vw,24px)', borderRadius: '20px', backgroundColor: '#fff', backgroundImage: `url('${card.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0' }}>
              <h3 style={{ color: '#177D3C', marginBottom: '15px', fontSize: '24px', fontWeight: '500' }}>{card.title}</h3>
              <p style={{ color: '#17181B', marginBottom: '10px', fontSize: '56px', fontWeight: '650', lineHeight: '1.1', whiteSpace: 'nowrap' }}>{card.subtitle1}</p>
              <p style={{ color: '#177D3C', marginBottom: '30px', fontSize: '56px', fontWeight: '650', lineHeight: '1.1', whiteSpace: 'nowrap' }}>{card.subtitle2}</p>
              <div>
                <Link to={card.link} target="_self" style={{ color: 'white', backgroundColor: '#177D3C', padding: '10px 25px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', display: 'inline-block', transition: 'background-color 0.3s ease' }} onMouseEnter={e => e.target.style.backgroundColor = '#125d2d'} onMouseLeave={e => e.target.style.backgroundColor = '#177D3C'}>
                  자세히 보기 &gt;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 도트 인디케이터: 슬라이더 바깥, 더 아래에 위치 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '0', marginBottom: '16px' }}>
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: current === idx ? '32px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: current === idx ? '#177D3C' : '#D9D9D9',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Section 2: About Company */}
      <div style={{ padding: "2vw 2vw" }}>
        <div style={{ maxWidth: "90vw", margin: "0 auto", width: '90vw' }}>
        
        <div style={{ padding: "80px 40px 80px 40px", paddingRight: "0", border: "2px solid #1BA74E", borderRadius: "16px", backgroundColor: "#1BA74E", textAlign: "left", backgroundImage: "url(/images/about_jhaion.png)", backgroundSize: "cover", backgroundPosition: "right center", backgroundRepeat: "no-repeat" }}>
          <h3 style={{ color: "#FDFDFD", marginBottom: "10px", fontSize: "24px", fontWeight: "400" }}>JHAION Engine : The Core of Optimization</h3>
          <p style={{ color: "#FDFDFD", marginBottom: "5px", fontSize: "40px", fontWeight: "600", lineHeight: "0.9", whiteSpace: "nowrap" }}>
            Net-Zero와 최적화를 향한 초거대 AI의 여정
          </p>
          <p style={{ color: "rgba(253, 253, 253, 0.60)", fontSize: "40px", lineHeight: "0.9", whiteSpace: "nowrap" }}>
            <span style={{ color: "#FDFDFD" }}>J</span>ourney of <span style={{ color: "#FDFDFD" }}>H</span>yper-scale + <span style={{ color: "#FDFDFD" }}>AI</span> + <span style={{ color: "#FDFDFD" }}>O</span>ptimizatio<span style={{ color: "#FDFDFD" }}>n</span> + <span style={{ color: "#FDFDFD" }}>N</span>et-zero
          </p>
        </div>
        </div>
      </div>

      {/* Section 3: Solutions Slider */}
      <div style={{ width: '100vw', overflow: 'hidden', backgroundColor: "#ffffff", padding: "clamp(32px,6vw,60px) 2vw", borderTop: "none" }}>
        <div style={{ maxWidth: "90vw", margin: "0 auto", width: '90vw' }}>
          <h2 style={{ textAlign: "left", marginBottom: "0px", fontSize: "48px", fontWeight: "600", color: "#17181B", lineHeight: "0.2", whiteSpace: "nowrap" }}>데이터 공학으로 완성된</h2>
          <h2 style={{ textAlign: "left", marginBottom: "10px", fontSize: "48px", fontWeight: "600", color: "#177D3C", lineHeight: "0.9", whiteSpace: "nowrap" }}>JH솔루션의 통합플랫폼을 경험하세요</h2>
          <p style={{ textAlign: "left", marginTop: "20px", marginBottom: "40px", fontSize: "24px", fontWeight: "500", color: "#757B82", lineHeight: "1.5", whiteSpace: "nowrap" }}>에너지 소비패턴을 예측하고, AI가 CFD 시뮬레이션을 학습하여 최적의 운영환경을 자동 설계합니다.</p>
          
          <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <div ref={sliderRef3} style={{ display: "flex", gap: "clamp(12px,2vw,30px)", overflowX: "auto", paddingBottom: "clamp(8px,2vw,20px)", scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none", width: '100vw', maxWidth: '100vw' }} className="slider-hide-scrollbar">
            {/* Card 1: JHAION 엔진 */}
              <Link to="/solutions/jhaion-engine" style={{ textDecoration: "none", flex: "0 0 clamp(320px,30vw,480px)", minWidth: "280px", maxWidth: "600px" }}>
              <div style={{ border: "2px solid #FDFDFD", borderRadius: "12px", overflow: "hidden", backgroundColor: "#FDFDFD", display: "flex", flexDirection: "column", height: "100%", cursor: "pointer", transition: "transform 0.2s ease", padding: 0, boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)", overflow: "hidden" }}>
                <div style={{ padding: "30px 30px 20px 30px", textAlign: "left" }}>
                  <h3 style={{ color: "#17181B", marginBottom: "8px", fontSize: "24px", fontWeight: "500", lineHeight: "1.4" }}>JHAION 엔진</h3>
                  <p style={{ color: "#757B82", fontSize: "20px", fontWeight: "500", lineHeight: "1.4", margin: 0 }}>
                    Hyper-scale AI와 최적화 알고리즘 기반으로 산업과 도시 환경의 에너지 효율을 극대화 하는 통합 운영의 핵심 기술력
                  </p>
                </div>
                <div style={{ position: "relative", width: "100%", marginTop: "auto" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, #FDFDFD, transparent)", zIndex: 1 }}></div>
                  <img src="/images/solutions/card_jhaion.png" alt="JHAION 엔진" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", borderRadius: "8px" }} />
                </div>
              </div>
            </Link>

            {/* Card 2: 에너지 관리 */}
              <Link to="/solutions/energy" style={{ textDecoration: "none", flex: "0 0 clamp(320px,30vw,480px)", minWidth: "280px", maxWidth: "600px" }}>
              <div style={{ border: "2px solid #FDFDFD", borderRadius: "12px", overflow: "hidden", backgroundColor: "#FDFDFD", display: "flex", flexDirection: "column", height: "100%", cursor: "pointer", transition: "transform 0.2s ease", padding: 0, boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)" }}>
                <div style={{ padding: "30px 30px 20px 30px", textAlign: "left" }}>
                  <h3 style={{ color: "#17181B", marginBottom: "8px", fontSize: "24px", fontWeight: "500", lineHeight: "1.4" }}>에너지 관리</h3>
                  <p style={{ color: "#757B82", fontSize: "20px", fontWeight: "500", lineHeight: "1.4", margin: 0 }}>
                    BEMS, FEMS, HEMS를 통합 관리하여 실시간 에너지 소비 패턴을 분석하고, 비용 절감 및 ESG/탄소회계 대응 자동화
                  </p>
                </div>
                <div style={{ position: "relative", width: "100%", marginTop: "auto" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, #FDFDFD, transparent)", zIndex: 1 }}></div>
                  <img src="/images/solutions/card_energymgmt.png" alt="에너지 관리" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", borderRadius: "8px" }} />
                </div>
              </div>
            </Link>

            {/* Card 3: 시뮬레이션 */}
              <Link to="/solutions/simulation" style={{ textDecoration: "none", flex: "0 0 clamp(320px,30vw,480px)", minWidth: "280px", maxWidth: "600px" }}>
              <div style={{ border: "2px solid #FDFDFD", borderRadius: "12px", overflow: "hidden", backgroundColor: "#FDFDFD", display: "flex", flexDirection: "column", height: "100%", cursor: "pointer", transition: "transform 0.2s ease", padding: 0, boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)" }}>
                <div style={{ padding: "30px 30px 20px 30px", textAlign: "left" }}>
                  <h3 style={{ color: "#17181B", marginBottom: "8px", fontSize: "24px", fontWeight: "500", lineHeight: "1.4" }}>시뮬레이션</h3>
                  <p style={{ color: "#757B82", fontSize: "20px", fontWeight: "500", lineHeight: "1.4", margin: 0 }}>
                    CFD 융합 시뮬레이션과 AI 기반의 예측 기술로 설비의 고장을 사전 진단하고, 에너지 흐름과 설계를 정량적으로 검증
                  </p>
                </div>
                <div style={{ position: "relative", width: "100%", marginTop: "auto" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, #FDFDFD, transparent)", zIndex: 1 }}></div>
                  <img src="/images/solutions/card_simulation.png" alt="시뮬레이션" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", borderRadius: "8px" }} />
                </div>
              </div>
            </Link>

            {/* Card 4: 인공지능 */}
              <Link to="/solutions/ai" style={{ textDecoration: "none", flex: "0 0 calc(33.333% - 30px)", minWidth: "280px", maxWidth: "600px" }}>
              <div style={{ border: "2px solid #FDFDFD", borderRadius: "12px", overflow: "hidden", backgroundColor: "#FDFDFD", display: "flex", flexDirection: "column", height: "100%", cursor: "pointer", transition: "transform 0.2s ease", padding: 0, boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)" }}>
                <div style={{ padding: "30px 30px 20px 30px", textAlign: "left" }}>
                  <h3 style={{ color: "#17181B", marginBottom: "8px", fontSize: "24px", fontWeight: "500", lineHeight: "1.4" }}>인공지능</h3>
                  <p style={{ color: "#757B82", fontSize: "20px", fontWeight: "500", lineHeight: "1.4", margin: 0 }}>
                    머신러닝과 딥러닝 기반의 자율학습을 통해 복잡한 산업공정을 자동 제어하고, 수요/공급의 초정밀 예측으로 운영효율 혁신
                  </p>
                </div>
                <div style={{ position: "relative", width: "100%", marginTop: "auto" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, #FDFDFD, transparent)", zIndex: 1 }}></div>
                  <img src="/images/solutions/card_ai.png" alt="인공지능" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", borderRadius: "8px" }} />
                </div>
              </div>
            </Link>

            {/* Card 5: 디지털 트윈 */}
              <Link to="/solutions/digital-twin" style={{ textDecoration: "none", flex: "0 0 calc(33.333% - 30px)", minWidth: "280px", maxWidth: "600px" }}>
              <div style={{ border: "2px solid #FDFDFD", borderRadius: "12px", overflow: "hidden", backgroundColor: "#FDFDFD", display: "flex", flexDirection: "column", height: "100%", cursor: "pointer", transition: "transform 0.2s ease", padding: 0, boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)" }}>
                <div style={{ padding: "30px 30px 20px 30px", textAlign: "left" }}>
                  <h3 style={{ color: "#17181B", marginBottom: "8px", fontSize: "24px", fontWeight: "500", lineHeight: "1.4" }}>디지털 트윈</h3>
                  <p style={{ color: "#757B82", fontSize: "20px", fontWeight: "500", lineHeight: "1.4", margin: 0 }}>
                    현실의 물리적 자산을 가상 공간에 실시간으로 동기화 해 3D 관제를 구현하고, 시나리오 테스트로 최적의 의사결정을 지원
                  </p>
                </div>
                <div style={{ position: "relative", width: "100%", marginTop: "auto" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, #FDFDFD, transparent)", zIndex: 1 }}></div>
                  <img src="/images/solutions/card_digitaltwin.png" alt="디지털 트윈" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", borderRadius: "8px" }} />
                </div>
              </div>
            </Link>

            {/* Card 6: 미디어 */}
              <Link to="/solutions/media" style={{ textDecoration: "none", flex: "0 0 calc(33.333% - 30px)", minWidth: "280px", maxWidth: "600px" }}>
              <div style={{ border: "2px solid #FDFDFD", borderRadius: "12px", overflow: "hidden", backgroundColor: "#FDFDFD", display: "flex", flexDirection: "column", height: "100%", cursor: "pointer", transition: "transform 0.2s ease", padding: 0, boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)" }}>
                <div style={{ padding: "30px 30px 20px 30px", textAlign: "left" }}>
                  <h3 style={{ color: "#17181B", marginBottom: "8px", fontSize: "24px", fontWeight: "500", lineHeight: "1.4" }}>미디어</h3>
                  <p style={{ color: "#757B82", fontSize: "20px", fontWeight: "500", lineHeight: "1.4", margin: 0 }}>
                    복잡한 데이터를 시각적 인터랙션으로 재구성해 핵심 정보를 즉시 이해시키고, 명확한 전달과 빠른 의사결정을 지원
                  </p>
                </div>
                <div style={{ position: "relative", width: "100%", marginTop: "auto" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, #FDFDFD, transparent)", zIndex: 1 }}></div>
                  <img src="/images/solutions/card_media.png" alt="미디어" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", borderRadius: "8px" }} />
                </div>
              </div>
            </Link>
            </div>
          </div>

          {/* Dot Navigation */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px", paddingBottom: "20px" }}>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                style={{
                  width: currentSlide3 === index ? "32px" : "12px",
                  height: "12px",
                  backgroundColor: currentSlide3 === index ? "#177D3C" : "#D9D9D9",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onClick={() => {
                  const slider = sliderRef3.current
                  if (slider) {
                    const cardWidth = slider.firstChild.offsetWidth
                    const gap = 30
                    const scrollAmount = (cardWidth + gap) * (index - 1)
                    slider.scrollTo({ left: scrollAmount, behavior: 'smooth' })
                    setCurrentSlide3(index)
                  }
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Press & News Slider */}
      <div style={{ width: '100vw', overflow: 'hidden', backgroundColor: "#ffffff", padding: "clamp(32px,6vw,60px) 2vw", borderTop: "none" }}>
        <div style={{ maxWidth: "90vw", margin: "0 auto", width: '90vw' }}>
          <h2 style={{ textAlign: "left", marginBottom: "0px", fontSize: "48px", fontWeight: "600", color: "#17181B", lineHeight: "0.2", whiteSpace: "nowrap" }}>산업의 변화와 흐름을 주도하는</h2>
          <h2 style={{ textAlign: "left", marginBottom: "10px", fontSize: "48px", fontWeight: "600", color: "#177D3C", lineHeight: "0.9", whiteSpace: "nowrap" }}>JH솔루션의 새로운 소식을 만나보세요</h2>
          <p style={{ textAlign: "left", marginTop: "20px", marginBottom: "40px", fontSize: "24px", fontWeight: "500", color: "#757B82", lineHeight: "1.5", whiteSpace: "nowrap" }}>언론이 주목한 혁신 기술부터 최신 프로젝트 수주까지, JH 솔루션이 창출하는 가치를 생생하게 전달합니다</p>
          <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
          <div ref={sliderRef4} style={{ display: "flex", justifyContent: "flex-start", alignItems: "stretch", gap: "clamp(12px,2vw,30px)", overflowX: "hidden", overflowY: "hidden", paddingBottom: "clamp(8px,2vw,20px)", scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none", width: '100vw', maxWidth: '100vw' }} className="slider-hide-scrollbar">
                {pressReleases.map((pressRelease, index) => (
              <Link key={index} to={`/press/${pressRelease.frontmatter.slug}`} style={{ textDecoration: "none", border: "2px solid #FDFDFD", borderRadius: "12px", overflow: "hidden", backgroundColor: "#FDFDFD", display: "flex", flexDirection: "column", width: "533px", minWidth: "533px", maxWidth: "533px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)", padding: 0, height: "auto", cursor: "pointer", transition: "transform 0.2s ease" }}>
                <div style={{ padding: "30px 30px 20px 30px", textAlign: "left" }}>
                  <h3 style={{ color: "#17181B", marginBottom: "8px", fontSize: "24px", fontWeight: "500", lineHeight: "1.4" }}>{pressRelease.frontmatter.title}</h3>
                  <p style={{ color: "#757B82", fontSize: "20px", fontWeight: "500", lineHeight: "1.4", marginBottom: "10px" }}>
                    {pressRelease.frontmatter.summary}
                  </p>
                  <p style={{ color: "#999", fontSize: "12px", margin: 0 }}>
                    {new Date(pressRelease.frontmatter.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '')}
                  </p>
                </div>
                <div style={{ position: "relative", width: "100%", marginTop: "auto", padding: 0 }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, #FDFDFD, transparent)", zIndex: 1 }}></div>
                  <img 
                    src={pressRelease.frontmatter.featureImage || "/images/none_feature.png"} 
                    alt={pressRelease.frontmatter.title}
                    style={{ width: "533px", height: "300px", display: "block", objectFit: "cover" }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
          {/* Dot Navigation */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px", paddingBottom: "20px" }}>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                style={{
                  width: currentSlide4 === index ? "32px" : "12px",
                  height: "12px",
                  backgroundColor: currentSlide4 === index ? "#177D3C" : "#D9D9D9",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onClick={() => {
                  const slider = sliderRef4.current
                  if (slider) {
                    const cardWidth = slider.firstChild.offsetWidth
                    const gap = 30
                    const scrollAmount = (cardWidth + gap) * (index - 1)
                    slider.scrollTo({ left: scrollAmount, behavior: 'smooth' })
                    setCurrentSlide4(index)
                  }
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: CTA */}
      <div style={{ padding: "2vw 2vw" }}>
        <div style={{ maxWidth: "90vw", margin: "0 auto", width: "90vw" }}>
          <div style={{ padding: "80px 40px 80px 40px", paddingRight: "40px", border: "none", borderRadius: "16px", backgroundColor: "#FDFDFD", textAlign: "left", backgroundImage: "url(/images/bg_contact.png)", backgroundSize: "120% auto", backgroundPosition: "right center", backgroundRepeat: "no-repeat", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ maxWidth: "50%" }}>
              <h2 style={{ textAlign: "left", marginBottom: "0px", fontSize: "48px", fontWeight: "600", color: "#17181B", lineHeight: "0.2", whiteSpace: "nowrap" }}>지능형 운영의 첫걸음</h2>
              <h2 style={{ textAlign: "left", marginBottom: "10px", fontSize: "48px", fontWeight: "600", color: "#177D3C", lineHeight: "0.9", whiteSpace: "nowrap" }}>JH 솔루션이 함께 합니다</h2>
              <p style={{ textAlign: "left", marginTop: "20px", marginBottom: "40px", fontSize: "24px", fontWeight: "500", color: "#757B82", lineHeight: "1.5", whiteSpace: "nowrap" }}>검증된 노하우와 최신 기술을 바탕으로 데이터를 분석해 최적의 솔루션을 제안합니다</p>
              <Link to="/contact" style={{ color: "white", backgroundColor: "#177D3C", padding: "12px 30px", borderRadius: "4px", textDecoration: "none", fontWeight: "bold", fontSize: "16px", display: "inline-block", transition: "all 0.3s ease" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#135f30"} onMouseLeave={(e) => e.target.style.backgroundColor = "#177D3C"}>
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>

  </Layout>
  )
}

export const Head = () => <Seo title="홈" />

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/press/" } }
      sort: { frontmatter: { date: DESC } }
      limit: 6
    ) {
      nodes {
        frontmatter {
          title
          date
          summary
          featureImage
          slug
        }
      }
    }
  }
`
