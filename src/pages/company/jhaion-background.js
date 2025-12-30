import React from "react";
import Layout from "../../components/layout";
import JourneyTextAnimation from "../../components/template/JourneyTextAnimation";
import SectionTitle from "../../components/template/SectionTitle"
import DescriptionCard from "../../components/template/DescriptionCard"
import PlusIconWithFlex from "../../components/template/PlusIconWithFlex"
import * as styles from "./vision-mission.module.css"
import * as bgStyles from "./jhaion-background.module.css"


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

      {/* Hyper-scale AI와 공학(Engineering)의 필연적 만남 */}
      <section className={styles.container}>
        <SectionTitle
          sectionLabel={'기술적 해답 (The Solution)'}
          title={'Hyper-scale AI와 공학(Engineering)의 필연적 만남'}
          description={
            "제이에이치솔루션은 IT 개발자와 공학 박사들이 머리를 맞대고 탄생시킨 결과물입니다.\n" +
            "데이터를 빠르게 처리하는 AI의 속도에 물리 법칙을 해석하는 공학적 깊이를 융합하여, 현실과 오차 없이 동기화되는 초정밀 엔진 'JHAION'을 개발했습니다."
          }
        />

        <div className={styles.flexBoxWithPlus}>
          <DescriptionCard
            imageSrc={"/images/about/mission-5.png"}
            imageAlt={"AI + 시뮬레이션 융합으로 한계 돌파"}
            title={"AI + 시뮬레이션 융합으로 한계 돌파"}
            description={
              "AI의 효율과 CFD의 정확함을 결합하여, 단순 예측을 넘어 정확한 시뮬레이션 기반의 초고속 최적 설계 및 자율 운영 시스템을 구현했습니다."
            }
          />
          <PlusIconWithFlex />
          <DescriptionCard
            imageSrc={"/images/about/mission-5.png"}
            imageAlt={"AI+플랫폼으로 산업 현장에 확장"}
            title={"AI+플랫폼으로 산업 현장에 확장"}
            description={
              "에너지 효율, 설비 안전, 자율 운영 등 핵심 산업 분야에 JHAION 엔진을 적용하여, 정량적 데이터 기반의 효율 극대화를 실현하는 플랫폼을 제공합니다."
            }
          />
        </div>
      </section>

      {/* 궁극적 목표 (The Impact) */}
      <section className={styles.container}>
        <SectionTitle
          sectionLabel={'궁극적 목표 (The Impact)'}
          title={'Net-Zero를 향한 가장 확실한 기술 표준'}
          description={
            "우리의 기술 개발은 단순히 효율을 높이는 데 그치지 않습니다.\n" +
            "기업에게는 최적의 비용 절감을, 지구에게는 탄소 없는 미래를 선물하는 것. 이것이 JHAION 엔진이 끊임없이 진화하는 이유입니다."
          }
        />

        <div className={bgStyles.bannerImageContainer}>
          <img
            src={'/images/about/jhaionbackgrounds/jbg-5.png'}
            alt={'jhaion-banner'}
          />
        </div>
      </section>
    </Layout>
  )
}
