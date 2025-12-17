
import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "./index.module.css"
import { useSlide } from "../hooks/useSlide";
import OpenIconWhite from '../../static/icons/common/open-icon-white.svg';
import arrowLeft from '../../static/icons/common/arrow-left-icon.svg';
import arrowRight from '../../static/icons/common/arrow-right-icon.svg';
import ReadMoreIcon from '../../static/icons/common/angle-bracket-right-icon.svg';

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

// Solutions data (original set)
const solutions = [
  { link: "/solutions/jhaion-engine", title: "JHAION 엔진", desc: "Hyper-scale AI와 최적화 알고리즘 기반으로 산업과 도시 환경의 에너지 효율을 극대화 하는 통합 운영의 핵심 기술력", img: "/images/solutions/card_jhaion1.png", alt: "JHAION 엔진" },
  { link: "/solutions/energy", title: "에너지 관리", desc: "BEMS, FEMS, HEMS를 통합 관리하여 실시간 에너지 소비 패턴을 분석하고, 비용 절감 및 ESG/탄소회계 대응 자동화", img: "/images/solutions/card_energy1.png", alt: "에너지 관리" },
  { link: "/solutions/simulation", title: "시뮬레이션", desc: "CFD 융합 시뮬레이션과 AI 기반의 예측 기술로 설비의 고장을 사전 진단하고, 에너지 흐름과 설계를 정량적으로 검증", img: "/images/solutions/card_simulation.png", alt: "시뮬레이션" },
  { link: "/solutions/ai", title: "인공지능", desc: "머신러닝과 딥러닝 기반의 자율학습을 통해 복잡한 산업공정을 자동 제어하고, 수요/공급의 초정밀 예측으로 운영효율 혁신", img: "/images/solutions/card_ai.png", alt: "인공지능" },
  { link: "/solutions/digital-twin", title: "디지털 트윈", desc: "현실의 물리적 자산을 가상 공간에 실시간으로 동기화 해 3D 관제를 구현하고, 시나리오 테스트로 최적의 의사결정을 지원", img: "/images/solutions/card_digitaltwin.png", alt: "디지털 트윈" },
  { link: "/solutions/media", title: "미디어", desc: "복잡한 데이터를 시각적 인터랙션으로 재구성해 핵심 정보를 즉시 이해시키고, 명확한 전달과 빠른 의사결정을 지원", img: "/images/solutions/card_media.png", alt: "미디어" },
];

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
  const solutionsSliderRef = React.useRef(null)
  const sliderRef4 = React.useRef(null)
  const [solutionsItemStride, setSolutionsItemStride] = React.useState(0)
  const isNormalizingSolutions = React.useRef(false)
  const { currentSlide: solutionsCurrent, nextSlide: solutionsNext, prevSlide: solutionsPrev, goToSlide: solutionsGoTo } = useSlide({
    totalSlides: solutions.length,
    autoPlay: true,
    autoPlayInterval: 5000,
  })
  const [currentSlide4, setCurrentSlide4] = React.useState(1)


  // 제품 카드 자동 롤링 (solutions)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const slider = solutionsSliderRef.current
      if (slider && solutionsItemStride) {
        // 자동 이동은 부드럽게, 경계 보정은 onScroll에서 무애니메이션 처리
        slider.scrollBy({ left: solutionsItemStride, behavior: 'smooth' })
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [solutionsItemStride])

  // Solutions slider: setup pseudo-infinite scroll using duplicated set [A..N][A..N]
  React.useEffect(() => {
    const slider = solutionsSliderRef.current
    if (!slider) return
    const first = slider.firstChild
    if (!first) return

    const computed = window.getComputedStyle(slider)
    const gapStr = computed.gap || computed.columnGap || '30px'
    const gap = parseFloat(gapStr) || 30

    const stride = first.offsetWidth + gap
    const setWidth = stride * solutions.length

    setSolutionsItemStride(stride)

    // Place the scroll at the start of the second set for seamless left/right looping
    // Preserve any existing scrollLeft if already set (CSR navigation), but if near 0, jump to middle
    requestAnimationFrame(() => {
      if (slider.scrollLeft < setWidth * 0.5) {
        slider.scrollLeft = setWidth + (slider.scrollLeft || 0)
      }
    })

    const onScroll = () => {
      const maxScroll = slider.scrollWidth // includes both sets
      const left = slider.scrollLeft
      const epsilon = 1

      if (isNormalizingSolutions.current) return

      // Left boundary: jump forward by one set width (silent)
      if (left <= epsilon) {
        isNormalizingSolutions.current = true
        const prevBehavior = slider.style.scrollBehavior
        slider.style.scrollBehavior = 'auto'
        slider.scrollLeft = left + setWidth
        slider.style.scrollBehavior = prevBehavior
        isNormalizingSolutions.current = false
        return
      }
      // Right boundary: jump back by one set width (silent)
      if (left + slider.clientWidth >= maxScroll - epsilon) {
        isNormalizingSolutions.current = true
        const prevBehavior = slider.style.scrollBehavior
        slider.style.scrollBehavior = 'auto'
        slider.scrollLeft = left - setWidth
        slider.style.scrollBehavior = prevBehavior
        isNormalizingSolutions.current = false
        return
      }

      // Update effective index within original set [0..N-1]
      const rel = slider.scrollLeft % setWidth
      let idx = Math.round(rel / stride)
      if (idx >= solutions.length) idx = 0
      if (idx < 0) idx = 0
      solutionsGoTo(idx)
    }

    slider.addEventListener('scroll', onScroll)
    return () => slider.removeEventListener('scroll', onScroll)
  }, [solutions.length])

  const handleMovePrevSolution = () => {
    const slider = solutionsSliderRef.current
    if (slider && solutionsItemStride) {
      slider.scrollBy({ left: -solutionsItemStride, behavior: 'smooth' })
    }
    solutionsPrev()
  }

  const handleMoveNextSolution = () => {
    const slider = solutionsSliderRef.current
    if (slider && solutionsItemStride) {
      slider.scrollBy({ left: solutionsItemStride, behavior: 'smooth' })
    }
    solutionsNext()
  }


  return (
    <Layout>
      {/* Section 1: Hero Slider */}
      <div className={styles.heroWrapper}>
        <div
          className={styles.heroTrack}
          style={{
            transform: `translateX(-${current * 100}%)`
          }}
        >
          {cards.map((card, idx) => {
            const isCurrent = current === idx;
            return (
              <div
                key={idx}
                className={`${styles.heroSlide} ${!isCurrent ? styles.heroSlideHidden : ''}`}
                aria-hidden={!isCurrent}
              >
                <div className={styles.heroCard} style={{ backgroundImage: `url('${card.image}')` }}>
                  <h3 className={styles.heroKicker}>{card.title}</h3>
                  <p className={styles.heroTitle1}>{card.subtitle1}</p>
                  <p className={styles.heroTitle2}>{card.subtitle2}</p>

                  <Link
                    to={card.link}
                    target="_self"
                  >
                    <div className={styles.heroCta}>
                      <span>자세히 보기</span>
                      <div className={styles.heroCtaIcon}>
                        <img
                          src={ReadMoreIcon}
                          alt={'Read More'}
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI: 첫번째 컨트롤 컴포넌트 : Navigation Controls (스왑됨) */}
      <div className={styles.navControls}>
        {/* 이전 화살표 버튼 */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + cards.length) % cards.length)}
          className={styles.navBtn}
          aria-label="이전 슬라이드"
        >
          <img src={arrowLeft} alt={'Previous Slide'} className={styles.navIcon} />
        </button>

        {/* ex. 1/3 */}
        <div className={styles.navCounter}>
          <span className={styles.navCounterCurrent}>
            {String((current ?? 0) + 1).padStart(2, "0")}
          </span>
          <span className={styles.navCounterSep}>|</span>
          <span className={styles.navCounterTotal}>
            {String(cards.length).padStart(2, "0")}
          </span>
        </div>

        {/* 다음 화살표 버튼 */}
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % cards.length)}
          className={styles.navBtn}
          aria-label="다음 슬라이드"
        >
          <img src={arrowRight} alt={'Next Slide'} className={styles.navIcon} />
        </button>
      </div>

      {/* Section 2: About Company */}
      <div className={styles.sectionPad}>
        <div className={styles.aboutBanner}>
          <h3 className={styles.aboutH3}>
            JHAION Engine : The Core of Optimization
          </h3>
          <p className={styles.aboutP1}>
            Net-Zero와 최적화를 향한 초거대 AI의 여정
          </p>
          <p className={styles.aboutP2}>
            <span className={styles.textWhite}>J</span>ourney of <span className={styles.textWhite}>H</span>yper-scale + <span className={styles.textWhite}>AI</span> + <span className={styles.textWhite}>O</span>ptimizatio<span className={styles.textWhite}>n</span> + <span className={styles.textWhite}>N</span>et-zero
          </p>
        </div>
      </div>

      {/* Section 3: Solutions Slider */}
      <div className={styles.solutionsSec}>
        <div className={styles.solutionsHeader}>
          <h2 className={styles.solutionsTitle1}>데이터 공학으로 완성된</h2>
          <h2 className={styles.solutionsTitle2}>JH솔루션의 통합플랫폼을 경험하세요</h2>
          <p className={styles.solutionsLead}>에너지 소비패턴을 예측하고, AI가 CFD 시뮬레이션을 학습하여 최적의 운영환경을 자동 설계합니다.</p>
        </div>

        <div className={styles.sliderWrap}>
          <div ref={solutionsSliderRef} className={`${styles.solutionsSlider} slider-hide-scrollbar`}>
            {solutions
              .concat(solutions)
              .map((item, idx) => (
                <Link key={`${item.link}-${idx}`} to={item.link} className={styles.solutionLink}>
                  <div className={styles.solutionCard}>
                    <div className={styles.solutionCardHeader}>
                      <h3 className={styles.solutionCardTitle}>{item.title}</h3>
                      <p className={styles.solutionCardP}>{item.desc}</p>
                    </div>
                    <div className={styles.solutionImgWrap}>
                      <div className={styles.gradientTop}></div>
                      <img src={item.img} alt={item.alt} className={styles.cardImg} />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* AI: 두번째 컨트롤 컴포넌트 : 도트 인디케이터 (스왑됨) */}
        <div className={styles.dots}>
          {solutions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const slider = solutionsSliderRef.current
                if (!slider || !solutionsItemStride) return
                const stride = solutionsItemStride
                const setWidth = stride * solutions.length
                const targetLeft = setWidth + stride * idx
                slider.scrollTo({ left: targetLeft, behavior: 'smooth' })
                solutionsGoTo(idx)
              }}
              className={`${styles.dot} ${solutionsCurrent === idx ? styles.dotActive : ''}`}
              aria-label={`${idx + 1}번 슬라이드로 이동`}
            />
          ))}
        </div>
      </div>

      {/* Section 4: Press & News Slider */}
      <div className={styles.pressSec}>
        <div>
          <div className={styles.sectionPad}>
            <h2 className={styles.pressTitle1}>산업의 변화와 흐름을 주도하는</h2>
            <h2 className={styles.pressTitle2}>JH솔루션의 새로운 소식을 만나보세요</h2>
            <p className={styles.pressLead}>언론이 주목한 혁신 기술부터 최신 프로젝트 수주까지, JH 솔루션이 창출하는 가치를 생생하게 전달합니다</p>
          </div>
          <div className={styles.pressSliderWrap}>
            <div ref={sliderRef4} className={`${styles.pressSlider} slider-hide-scrollbar`}>
              {pressReleases.map((pressRelease, index) => (
                <Link key={index} to={`/press/${pressRelease.frontmatter.slug}`} className={styles.pressLink}>
                  <div className={styles.pressHeader}>
                    <h3 className={styles.pressTitle}>{pressRelease.frontmatter.title}</h3>
                    <p className={styles.pressSummary}>
                      {pressRelease.frontmatter.summary}
                    </p>
                    <p className={styles.pressDate}>
                      {new Date(pressRelease.frontmatter.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '')}
                    </p>
                  </div>
                  <div className={styles.pressImgWrap}>
                    <div className={styles.gradientTop}></div>
                    <img
                      src={pressRelease.frontmatter.featureImage || "/images/none_feature.png"}
                      alt={pressRelease.frontmatter.title}
                      className={styles.pressImg}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Dot Navigation */}
          <div className={styles.dotsWrap}>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className={`${styles.dot} ${currentSlide4 === index ? styles.dotActive : ''}`}
                onClick={() => {
                  const slider = sliderRef4.current
                  if (slider) {
                    const cardWidth = slider.firstChild.offsetWidth
                    const gap = 30
                    const scrollAmount = (cardWidth + gap) * (index - 1)
                    slider.scrollTo({ left: scrollAmount, behavior: "smooth" })
                    setCurrentSlide4(index)
                  }
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: CTA */}
      <section
        className={styles.ctaSection}
        style={{
          backgroundImage: "linear-gradient(to right bottom, #F6FEF9, transparent), url(/images/banners/contact-illustration-image.png)",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "left top, right bottom",
          backgroundSize: "cover, auto 90%",
          boxShadow: "2px 4px 20px 0 rgba(49, 78, 152, 0.12)"
        }}
      >
        <div className={styles.ctaInner}>
          <div className={styles.ctaContent}>
            <h1 className={styles.ctaTitle}>
              지능형 운영의 첫걸음
              <br />
              <span className={styles.ctaEmphasis}>
              제이에이치솔루션이 함께합니다.
            </span>
            </h1>

            <p className={styles.ctaDescription}>
              검증된 노하우와 최신 기술을 바탕으로 데이터를 분석해 최적의 솔루션을 제안합니다.
            </p>
          </div>

          <button className={styles.ctaButton}>
            <span>문의하기</span>

            <span className={styles.ctaButtonIcon}>
              <img
                width={20}
                height={20}
                src={OpenIconWhite}
                alt={'Read More'}
              />
            </span>
          </button>
        </div>
      </section>

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
