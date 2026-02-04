import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "./index.module.css"
import { useSlider } from "../hooks/useSlider";
import { useIsMobile } from '../hooks/useIsMobile';
import { DRAG_THRESHOLD_SOLUTIONS } from "../utils/slider";
import AngleBracketRight from '../../static/icons/common/angle-bracket-right-icon.svg';
import AngleBracketRightLight from '../../static/icons/common/angle-bracket-right-icon-light.svg';
import arrowLeft from '../../static/icons/common/arrow-left-icon.svg';
import arrowRight from '../../static/icons/common/arrow-right-icon.svg';

const cards = [
  {
    title: "Hyper-scale AI for Net-Zero",
    subtitle1: "초거대 AI가 여는 탄소중립의 미래",
    subtitle2: "가장 완벽한 에너지 최적화의 실현",
    link: "/company/vision-mission",
    image: {
      desktop: "/images/main-1.png",
      mobile: "/images/mobile-main-1.png",
    }
  },
  {
    title: "Beyond Data, Integration of Engineering",
    subtitle1: "데이터의 한계를 넘는 공학적 통찰",
    subtitle2: "현장의 난제를 꿰뚫는 AI와 시뮬레이션의 혁신적 융합",
    link: "/company/jhaion-background",
    image: {
      desktop: "/images/main-2.png",
      mobile: "/images/mobile-main-2.png",
    }
  },
  {
    title: "Proven Success, Trusted Partner",
    subtitle1: "데이터로 증명하는 압도적 효율",
    subtitle2: "비즈니스 성공을 위한 검증된 파트너십",
    link: "/company/partners",
    image: {
      desktop: "/images/main-3.png",
      mobile: "/images/mobile-main-3.png",
    }
  }
];

// 솔루션 데이터 (원본 세트)
const solutions = [
  { id: 'jhaion-engine', link: "/solutions/jhaion-engine", title: "JHAION 엔진", desc: "Hyper-scale AI와 최적화 알고리즘 기반으로 산업과 도시 환경의 에너지 효율을 극대화하는 통합 운영의 핵심 기술력", img: "/images/solutions/card_jhaion1.png", alt: "JHAION 엔진" },
  { id: 'energy', link: "/solutions/energy", title: "에너지 관리", desc: "BEMS, FEMS, HEMS를 통합 관리하여 실시간 에너지 소비 패턴을 분석하고, 비용 절감 및 ESG/탄소회계 대응 자동화", img: "/images/solutions/card_energy1.png", alt: "에너지 관리" },
  { id: 'simulation', link: "/solutions/simulation", title: "시뮬레이션", desc: "CFD 융합 시뮬레이션과 AI 기반의 예측 기술로 설비의 고장을 사전 진단하고, 에너지 흐름과 설계를 정량적으로 검증", img: "/images/solutions/card_simulation.png", alt: "시뮬레이션" },
  { id: 'ai', link: "/solutions/ai", title: "인공지능", desc: "머신러닝과 딥러닝 기반의 자율학습을 통해 복잡한 산업 공정을 자동 제어하고, 수요/공급의 초정밀 예측으로 운영 효율 혁신", img: "/images/solutions/card_ai.png", alt: "인공지능" },
  { id: 'digital-twin', link: "/solutions/digitaltwin", title: "디지털 트윈", desc: "현실의 물리적 자산을 가상 공간에 실시간 동기화해 3D 관제를 구현하고, 다양한 시나리오 테스트로 최적의 의사결정 지원", img: "/images/solutions/card_digitaltwin.png", alt: "디지털 트윈" },
  { id: 'media', link: "/solutions/media", title: "미디어", desc: "복잡한 데이터를 시각적 인터랙션을 재구성해 핵심 정보를 즉시 이해시키고, 명확한 전달과 빠른 의사 결정을 지원", img: "/images/solutions/card_media.png", alt: "미디어" },
];

const IndexPage = ({ data }) => {
  const pressReleases = data.allMarkdownRemark.nodes

  const [current, setCurrent] = React.useState(1);
  const [transitionOn, setTransitionOn] = React.useState(true);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const solutionsSliderRef = React.useRef(null)
  const pressSliderRef = React.useRef(null)

  const isMobile = useIsMobile();

  // 재사용 가능한 슬라이더 훅
  const solutionsSlider = useSlider({
    ref: solutionsSliderRef,
    itemsLength: solutions.length,
    dragThreshold: DRAG_THRESHOLD_SOLUTIONS,
    getHrefFromEvent: (e) => {
      const anchor = e.target && (e.target.closest ? e.target.closest('a, [role="link"]') : null)
      return anchor?.getAttribute ? anchor.getAttribute('href') : null
    },
  })

  // 사용자에게 보여줄 실제 슬라이드 인덱스
  const displayIndex = (() => {
    if (current === 0) {
      return cards.length - 1;
    }

    if (current === cards.length + 1) {
      return 0;
    }

    return current - 1;
  })();

  const slides = React.useMemo(() => {
    if (!cards?.length) {
      return [];
    }
    return [
      cards[cards.length - 1],
      ...cards,
      cards[0],
    ];
  }, []);

  // Hero 배너 다음 버튼
  const handleHeroBannerNext = React.useCallback(() => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setCurrent(prev => prev + 1);
  }, [isAnimating]);

  // Hero 배너 이전 버튼
  const handleHeroBannerPrev = React.useCallback(() => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setCurrent(prev => prev - 1);
  }, [isAnimating]);

  // 자동 롤링 타이머
  React.useEffect(() => {
    const timer = setInterval(() => {
      handleHeroBannerNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [handleHeroBannerNext]);

  const pressSlider = useSlider({
    ref: pressSliderRef,
    itemsLength: pressReleases.length,
    dragThreshold: 10,
    getHrefFromEvent: (e) => {
      const anchor = e.target && (e.target.closest ? e.target.closest('a, [role="link"]') : null)
      return anchor?.getAttribute ? anchor.getAttribute('href') : null
    },
  })

  return (
    <Layout>
      {/* 섹션 1: 히어로 슬라이더 */}
      <div className={styles.heroWrapper}>
        <div
          className={styles.heroTrack}
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: transitionOn ? "transform 500ms ease" : "none",
          }}
          onTransitionEnd={() => {
            // 맨 앞에 있는 "마지막 슬라이드 복제본"까지 이동한 경우
            // → 트랜지션을 끄고 실제 마지막 슬라이드 위치로 즉시 이동
            if (current === 0) {
              setCurrent(cards.length);
            }

            // 맨 뒤에 있는 "첫 번째 슬라이드 복제본"까지 이동한 경우
            // → 트랜지션을 끄고 실제 첫 번째 슬라이드 위치로 즉시 이동
            if (current === cards.length + 1) {
              setCurrent(1);
            }

            setIsAnimating(false);
            setTransitionOn(false);

            // transition을 다시 활성화
            requestAnimationFrame(() => {
              requestAnimationFrame(() => setTransitionOn(true));
            });
          }}
        >
          {slides.map((card, idx) => {
            const isCurrent = current === idx
            return (
              <div
                key={idx}
                className={`${styles.heroSlide} ${!isCurrent ? styles.heroSlideHidden : ""}`}
                aria-hidden={!isCurrent}
              >
                <div
                  className={styles.heroCard}
                  style={{
                    backgroundImage: `
                      linear-gradient(124deg, #F6FEF9 21.51%, transparent 57.84%), url('${!isMobile ? card.image.desktop : card.image.mobile}')
                    `,
                  }}
                >
                  <h3 className={styles.heroKicker}>{card.title}</h3>
                  <p className={styles.heroTitle1}>{card.subtitle1}</p>
                  <p className={styles.heroTitle2}>{card.subtitle2}</p>

                  <Link to={card.link} target="_self">
                    <div className={styles.heroCta}>
                      <span>자세히 보기</span>
                      {!isMobile && (
                        <div className={styles.heroCtaIcon}>
                          <img
                            src={AngleBracketRight}
                            alt={"Read More"}
                            width={20}
                            height={20}
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AI: 첫번째 컨트롤 컴포넌트 : Navigation Controls (스왑됨) */}
      <div className={styles.navControls}>
        {/* 이전 화살표 버튼 */}
        <button
          onClick={handleHeroBannerPrev}
          className={styles.navBtn}
          aria-label="이전 슬라이드"
        >
          <img
            src={arrowLeft}
            alt={"Previous Slide"}
            className={styles.navIcon}
          />
        </button>

        {/* 예: 1/3 */}
        <div className={styles.navCounter}>
          <span className={styles.navCounterCurrent}>
            {String(displayIndex + 1).padStart(2, "0")}
          </span>
          <span className={styles.navCounterSep}>|</span>
          <span className={styles.navCounterTotal}>
            {String(cards.length).padStart(2, "0")}
          </span>
        </div>

        {/* 다음 화살표 버튼 */}
        <button
          onClick={handleHeroBannerNext}
          className={styles.navBtn}
          aria-label="다음 슬라이드"
        >
          <img src={arrowRight} alt={"Next Slide"} className={styles.navIcon} />
        </button>
      </div>

      {/* 섹션 2: 회사 소개 */}
      <div className={styles.sectionPad}>
        <div className={styles.aboutBanner}>
          {!isMobile && (
            <h3 className={styles.aboutBannerLabel}>
              JHAION Engine : The Core of Optimization
            </h3>
          )}
          <p className={styles.aboutTitle}>
            Net-Zero와 최적화를 향한 초거대 AI의 여정
          </p>
          <p className={styles.aboutDescription}>
            <span className={styles.textWhite}>J</span>ourney of&nbsp;
            <span className={styles.textWhite}>H</span>yper-scale +&nbsp;
            <span className={styles.textWhite}>AI</span> +&nbsp;
            <span className={styles.textWhite}>O</span>ptimization +&nbsp;
            <span className={styles.textWhite}>N</span>et-Zero
          </p>
        </div>
      </div>

      {/* 섹션 3: 솔루션 슬라이더 */}
      <section className={styles.sliderSection}>
        <div className={styles.solutionsSection}>
          <div className={styles.linkCardSectionHeader}>
            <h2 className={styles.title}>
              데이터 공학으로 완성된
              <br />
              <span>JH솔루션의 통합플랫폼을 경험하세요.</span>
            </h2>
            <p className={styles.description}>
              에너지 소비패턴을 예측하고, AI가 CFD 시뮬레이션을 학습하여 최적의
              운영환경을 자동 설계합니다.
            </p>
          </div>

          <div className={styles.sliderWrap}>
            <div
              ref={solutionsSliderRef}
              className={`${styles.solutionsSlider} slider-hide-scrollbar`}
              style={{ paddingLeft: solutionsSlider.padOn ? `${solutionsSlider.gap}px` : 0 }}
              onPointerDown={solutionsSlider.handlers.onPointerDown}
              onPointerMove={solutionsSlider.handlers.onPointerMove}
              onPointerUp={solutionsSlider.handlers.onPointerUp}
              onPointerLeave={solutionsSlider.handlers.onPointerLeave}
              onPointerCancel={solutionsSlider.handlers.onPointerCancel}
              onClickCapture={solutionsSlider.handlers.onClickCapture}
            >
              {solutions.concat(solutions).map((item, idx) => (
                <LinkCard item={item} key={`solutions-${idx}-${item.id}`} />
              ))}
            </div>
          </div>
        </div>
        {!isMobile && (
          /* AI: 두번째 컨트롤 컴포넌트 : 도트 인디케이터 (스왑됨) */
          <div className={styles.dots}>
            {solutions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => solutionsSlider.handleDotClick(idx)}
                className={`${styles.dot} ${solutionsSlider.current === idx ? styles.dotActive : ""
                  }`}
                aria-label={`${idx + 1}번 슬라이드로 이동`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 4: Press & News Slider */}
      <section className={styles.sliderSection}>
        <div className={styles.pressSection}>
          <div className={styles.linkCardSectionHeader}>
            <h2 className={styles.title}>
              산업의 변화와 흐름을 주도하는
              <br />
              <span>JH솔루션의 새로운 소식을 만나보세요.</span>
            </h2>
            <p className={styles.description}>
              언론이 주목한 혁신 기술부터 최신 프로젝트 수주까지, JH솔루션이
              창출하는 가치를 생생하게 전달합니다.
            </p>
          </div>
          <div className={styles.sliderWrap}>
            <div
              ref={pressSliderRef}
              className={`${styles.solutionsSlider} slider-hide-scrollbar`}
              style={{ paddingLeft: pressSlider.padOn ? `${pressSlider.gap}px` : 0 }}
              onPointerDown={pressSlider.handlers.onPointerDown}
              onPointerMove={pressSlider.handlers.onPointerMove}
              onPointerUp={pressSlider.handlers.onPointerUp}
              onPointerLeave={pressSlider.handlers.onPointerLeave}
              onPointerCancel={pressSlider.handlers.onPointerCancel}
              onClickCapture={pressSlider.handlers.onClickCapture}
            >
              {pressReleases.concat(pressReleases).map((item, idx) => (
                <LinkCard
                  item={item}
                  type="press"
                  key={`press-${idx}-${item.frontmatter?.slug || idx}`}
                />
              ))}
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className={styles.dots}>
            {pressReleases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => pressSlider.handleDotClick(idx)}
                className={`${styles.dot} 
                    ${pressSlider.current === idx ? styles.dotActive : ""
                  }`}
                aria-label={`프레스 ${idx + 1}번 슬라이드로 이동`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 5: CTA */}
      <section
        className={styles.ctaSection}
        style={{
          backgroundImage: !isMobile
            ? "linear-gradient(124deg, rgb(246, 254, 249) 21.51%, transparent 57.84%), url(/images/banners/contact-illustration-img.png)"
            : 'url(/images/banners/mobile-contact-illustration-img.jpg)',
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "left top, right bottom",
          backgroundSize: "cover, auto 90%",
          boxShadow: "2px 4px 20px 0 rgba(49, 78, 152, 0.12)",
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
              검증된 노하우와 최신 기술을 바탕으로 데이터를 분석해 최적의
              솔루션을 제안합니다.
            </p>
          </div>

          <a
            href="/contact"
            className={`
              ${!isMobile ? styles.ctaButton : styles.ctaMobileButton}`
            }
          >
            <span>문의하기</span>
            <span className={styles.ctaButtonIcon}>
              <img
                width={20}
                height={20}
                src={!isMobile ? AngleBracketRight : AngleBracketRightLight}
                alt={"Read More"}
              />
            </span>
          </a>
        </div>
      </section>
    </Layout>
  )
}

function LinkCard({ item, type = 'solutions' }) {
  const isPress = type === 'press'
  // 카드 타입에 따라 props 매핑
  const linkHref = isPress ? `/press/${item.frontmatter.slug}` : item.link
  const imgSrc = isPress ? (item.frontmatter.featureImage || '/images/none_feature.png') : item.img
  const imgAlt = isPress ? item.frontmatter.title : item.alt
  const title = isPress ? item.frontmatter.title : item.title
  const dateText = isPress
    ? new Date(item.frontmatter.date)
      .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replace(/\. /g, '-')
      .replace(/\.$/, '')
    : null

  return (
    <Link
      to={linkHref}
      className={styles.solutionLink}
    >
      <div className={styles.linkCardContainer}>
        <div className={styles.linkCardHeader}>
          {isPress ? (
            <>
              <h3 className={styles.linkCardTitle}>{title}</h3>
              <p className={styles.linkCardDescription}>{dateText}</p>
            </>
          ) : (
            <>
              <h3 className={styles.linkCardTitle}>{title}</h3>
              <p className={styles.linkCardDescription}>{item.desc}</p>
            </>
          )}
        </div>

        <div className={styles.linkCardImgWrap}>
          <div className={styles.topGradient} />
          <img
            src={imgSrc}
            alt={imgAlt}
            className={styles.cardImg}
          />
        </div>
      </div>
    </Link>
  )
}

export const Head = () => <Seo />

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
