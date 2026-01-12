import React from "react";
import Layout from "../../components/layout";
import JourneyTextAnimation from "../../components/template/JourneyTextAnimation";
import SectionTitle from "../../components/template/SectionTitle";
import DescriptionCard from "../../components/template/DescriptionCard";
import PlusIconWithFlex from "../../components/template/PlusIconWithFlex";
import CircleArrowRightIconWithFlex from "../../components/template/CircleRightIconWithFlex";
import * as styles from "./vision-mission.module.css";
import * as bgStyles from "./jhaion-background.module.css";


// 그라데이션 애니메이션 스타일 추가
const gradientTextStyle = {
  background: 'linear-gradient(90deg, #177D3C 0%, #4be085 50%, #177D3C 100%)',
  backgroundSize: '200% auto',
  color: '#177D3C',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'gradient-move 2.5s linear infinite',
  display: 'block',
};

// 전역 스타일에 keyframes 추가
const gradientKeyframes = `
  @keyframes gradient-move {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
`;

// 페이지 SEO 정보 (필요시 SEO 컴포넌트에 전달)
const PAGE_TITLE = "JHAION 개발배경";
const PAGE_DESCRIPTION = "JHAION 개발의 배경과 문제의식, 기술적 해답, 궁극적 목표를 소개합니다.";

export default function JhaionBackgroundNew() {
  // TODO: 아래 공간에 SEO 컴포넌트(Helmet, Seo 등) 추가 가능
  return (
    <Layout
      type="light"
      subHeaderTitle={PAGE_TITLE}
      subHeaderDescription={PAGE_DESCRIPTION}
      subHeaderBgImage={"/images/about/jhaionbackgrounds/intro.png"}
      subHeaderChildren={<JourneyTextAnimation />}
    >
      {/* Intro Section 아래 본문 */}
      <style>{gradientKeyframes}</style>
      <div className={styles.container}>
        {/* AI: “기존의 방식으로는 복잡한 현실을 담을 수 없었습니다.” 섹션 디자인 변경사항 반영 */}
        <section>
          <SectionTitle
            sectionLabel={'문제 인식 (The Challenge)'}
            title={'“기존의 방식으로는 복잡한 현실을 담을 수 없었습니다.”'}
            description={(
              <>
                과거의 에너지 관리는 경험에 의존하거나, 단순한 통계 데이터만을 신뢰했습니다.&nbsp;
                <br className={bgStyles.brForPC} />
                하지만 시시각각 변하는 산업 현장의 변수와 유체 흐름(CFD)을 배제한 데이터 분석은 잦은 오차와 비효율을 낳았습니다. 우리는 생각했습니다. "보이지 않는 물리적 현상까지 AI가 이해할 수는 없을까?"
              </>
            )} 
          />

          <div className={styles.flexBox}>
            {/* Left card: Technical Problem */}
            <div className={`${styles.valueCard} ${styles.challengeCard} ${styles.challengeBg1}`}>
              <div className={styles.valueHeader}>
                <span className={styles.valueLabel}>Technical Problem</span>
              </div>
              <div>
                <h3 className={styles.valueTitle}>
                  기존 기술의 명확한 한계 직면
                </h3>
                <p className={styles.valueDescription}>
                  기존 CFD 시뮬레이션은 정확했지만, 복잡한 시스템의 최적화와 대규모 자동화에는 시간 및 비용적 제약이 커서 실무적인 활용이 어려움이 있었습니다.
                </p>
              </div>
            </div>

            <CircleArrowRightIconWithFlex />

            {/* Right card: New Solution */}
            <div className={`${styles.valueCard} ${styles.challengeCard} ${styles.challengeBg2}`}>
              <div className={styles.valueHeader}>
                <span className={styles.valueLabel}>New Solution</span>
              </div>
              <div>
                <h3 className={styles.valueTitle}>
                  초거대 AI 기반의 새로운 해법 확인
                </h3>
                <p className={styles.valueDescription}>
                  복잡하고 방대한 비선형 데이터를 처리하고 예측하기 위해, 일반 AI를 뛰어넘는 HYPER-SCALE AI 도입이 필수적인 해결책이었습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hyper-scale AI와 공학(Engineering)의 필연적 만남 */}
        <section>
          <SectionTitle
            sectionLabel={'기술적 해답 (The Solution)'}
            title={'Hyper-scale AI와 공학(Engineering)의 필연적 만남'}
            description={(<>
              제이에이치솔루션은 IT 개발자와 공학 박사들이 머리를 맞대고 탄생시킨 결과물입니다.
              <br className={bgStyles.brForPC} />
              데이터를 빠르게 처리하는 AI의 속도에 물리 법칙을 해석하는 공학적 깊이를 융합하여, 현실과 오차 없이 동기화되는 초정밀 엔진 'JHAION'을 개발했습니다.
            </>)}
          />

          <div className={styles.flexBoxWithPlus}>
            <DescriptionCard
              imageSrc={"/images/about/mission-8.png"}
              imageAlt={"AI + 시뮬레이션 융합으로 한계 돌파"}
              title={"AI + 시뮬레이션 융합으로 한계 돌파"}
              description={
                "AI의 효율과 CFD의 정확함을 결합하여, 단순 예측을 넘어 정확한 시뮬레이션 기반의 초고속 최적 설계 및 자율 운영 시스템을 구현했습니다."
              }
            />
            <PlusIconWithFlex />
            <DescriptionCard
              imageSrc={"/images/about/mission-9.png"}
              imageAlt={"AI+플랫폼으로 산업 현장에 확장"}
              title={"AI+플랫폼으로 산업 현장에 확장"}
              description={
                "에너지 효율, 설비 안전, 자율 운영 등 핵심 산업 분야에 JHAION 엔진을 적용하여, 정량적 데이터 기반의 효율 극대화를 실현하는 플랫폼을 제공합니다."
              }
            />
          </div>
        </section>

        {/* 궁극적 목표 (The Impact) */}
        <section>
          <SectionTitle
            sectionLabel={'궁극적 목표 (The Impact)'}
            title={'Net-Zero를 향한 가장 확실한 기술 표준'}
            description={(<>
              우리의 기술 개발은 단순히 효율을 높이는 데 그치지 않습니다.
              <br className={bgStyles.brForPC} />
              기업에게는 최적의 비용 절감을, 지구에게는 탄소 없는 미래를 선물하는 것. 이것이 JHAION 엔진이 끊임없이 진화하는 이유입니다.
            </>)}
          />

          <div className={bgStyles.bannerImageContainer}>
            <img
              src={'/images/about/jhaionbackgrounds/jbg-5.png'}
              alt={'jhaion-banner'}
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}
