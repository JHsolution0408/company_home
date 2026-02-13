import React from "react";
import Seo from "../../components/seo";
import Layout from "../../components/layout";
import JourneyTextAnimation from "../../components/template/JourneyTextAnimation";
import SectionTitle from "../../components/template/SectionTitle";
import DescriptionCard from "../../components/template/DescriptionCard";
import PlusIconWithFlex from "../../components/template/PlusIconWithFlex";
import CircleArrowRightIconWithFlex from "../../components/template/CircleRightIconWithFlex";
import * as styles from "./vision-mission.module.css";
import * as bgStyles from "./jhaion-background.module.css";


import { useIsMobile } from "../../hooks/useIsMobile";

// 전역 스타일에 keyframes 추가
const gradientKeyframes = `
  @keyframes gradient-move {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
`;

// 페이지 SEO 정보 (필요시 SEO 컴포넌트에 전달)
const PAGE_TITLE = "JHAION 개발 배경";
const PAGE_DESCRIPTION = "JHAION 개발 배경과 기술적 해결 방법, 최종 목표를 소개합니다.";

export default function JhaionBackgroundNew() {
  // TODO: 아래 공간에 SEO 컴포넌트(Helmet, Seo 등) 추가 가능

  const isMobile = useIsMobile(768);

  const MobileValueImage = ({ imgSrc }) => {
    return (
      <img
        className={styles.valueMobileImg}
        src={imgSrc}
        alt="challenge"
      />
    )
  }

  return (
    <Layout
      type="light"
      subHeaderTitle={PAGE_TITLE}
      subHeaderDescription={PAGE_DESCRIPTION}
      subHeaderBgImage={'/images/banners/bg-jhaiondevelop.png'}
      anymationBanner={<JourneyTextAnimation />}
    >
      {/* Intro Section 아래 본문 */}
      <style>{gradientKeyframes}</style>
      <div className={styles.container}>
        <section>
          <SectionTitle
            sectionLabel={'문제 인식 (The Challenge)'}
            title={'“기존 방식만으로는 복잡한 현실을 담을 수 없었습니다.”'}
            description={(
              <>
                그동안 에너지 관리는 경험이나 단순 통계에 의존했습니다.&nbsp;
                <br className={bgStyles.brForPC} />
                현장의 다양한 변수와 유체 흐름(CFD)을 반영하지 못해 오차와 비효율이 커졌습니다. 그래서 우리는 "보이지 않는 물리 현상까지 이해하는 AI"를 고민했습니다.
              </>
            )}
            className={styles.jhaionTitle}
          />

          <div className={styles.flexBoxWithPlus}>
            {/* Left card: Technical Problem */}
            <div className={`${styles.valueCard} ${styles.challengeCard} ${styles.challengeBg1}`}>
              <div className={styles.jhAionValueHeader}>
                <span className={styles.valueLabel}>Technical Problem</span>
              </div>
              <div className={styles.titleWrap}>
                <h3 className={styles.valueTitle}>
                  기존 기술의 명확한 한계 직면
                </h3>
                <p className={styles.valueDescription}>
                  CFD 시뮬레이션은 정확하지만, 계산 시간이 길고 비용이 커서 현장에서 자동화·최적화에 바로 쓰기 어려웠습니다.
                </p>
              </div>
              {isMobile && <MobileValueImage imgSrc={"/images/about/jhaionbackgrounds/challenge_1.png"} />}
            </div>

            <CircleArrowRightIconWithFlex />

            {/* Right card: New Solution */}
            <div className={`${styles.valueCard} ${styles.challengeCard} ${styles.challengeBg2}`}>
              <div className={styles.jhAionValueHeader}>
                <span className={styles.valueLabel}>New Solution</span>
              </div>
              <div className={styles.titleWrap}>
                <h3 className={styles.valueTitle}>
                  Hyper scale AI의 새로운 해법 확인
                </h3>
                <p className={styles.valueDescription}>
                  복잡한 현장 데이터를 빠르게 처리하고 예측하려면, 더 큰 연산 능력을 가진 인텔리전스 AI가 필요했습니다.
                </p>
              </div>
              {isMobile && <MobileValueImage imgSrc={"/images/about/jhaionbackgrounds/challenge_2.png"} />}
            </div>
          </div>
        </section>

        {/* Hyper scale AI와 공학(Engineering)의 필연적 만남 */}
        <section>
          <SectionTitle
            sectionLabel={'기술적 해답 (The Solution)'}
            title={'Hyper scale AI와 공학(Engineering)의 필연적 만남'}
            description={(<>
              제이에이치솔루션은 IT 개발자와 공학 박사들이 머리를 맞대고 탄생시킨 결과물입니다.
              <br />
              데이터를 빠르게 처리하는 AI의 속도에 물리 법칙을 해석하는 공학적 깊이를 융합하여, 현실과 오차 없이 동기화되는 초정밀 엔진 'JHAION'을 개발했습니다.
            </>)}
            className={styles.jhaionTitle}
          />

          <div className={styles.flexBoxWithPlus}>
            <DescriptionCard
              imageSrc={"/images/about/mission-8.png"}
              imageAlt={"AI와 시뮬레이션 결합"}
              title={"AI와 시뮬레이션 결합"}
              description={
                "AI의 속도와 CFD의 정확도를 함께 써서, 단순 예측을 넘어 ‘시뮬레이션 기반 최적 설계’와 ‘자율 운영’을 가능하게 했습니다."
              }
            />
            <PlusIconWithFlex />
            <DescriptionCard
              imageSrc={"/images/about/mission-9.png"}
              imageAlt={"AI를 활용한 플랫폼으로 현장 적용"}
              title={"AI를 활용한 플랫폼으로 현장 적용"}
              description={
                <>
                  에너지 효율, 설비 안전, 자율 운영 등 다양한 현장에 적용할 수 있도록 플랫폼 형태로 확장했습니다.
                  <br />
                  정량적 데이터로 성과를 검증하며 효율을 높입니다.
                </>
              }
            />
          </div>
        </section>

        {/* 궁극적 목표 (The Impact) */}
        <section>
          <SectionTitle
            sectionLabel={'궁극적 목표 (The Impact)'}
            title={'Net Zero를 향한 가장 확실한 기술 표준'}
            description={(<>
              목표는 ‘효율 향상’에만 그치지 않습니다.
              <br />
              기업에는 비용 절감을, 지구에는 탄소 없는 미래를 만들기 위해 JHAION 엔진은 계속 발전합니다.
            </>)}
            className={styles.jhaionTitle}
          />

          <div className={bgStyles.bannerImageContainer}>
            <img
              src={!isMobile ? '/images/about/jhaionbackgrounds/jbg-7-pc.png' : '/images/about/jhaionbackgrounds/jbg-7-mobile.png'}
              alt={'jhaion-banner'}
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const Head = () => {
  return (
    <Seo 
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
    />
  )
}