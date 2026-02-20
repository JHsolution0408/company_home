import React from 'react';
import * as styles from '../../pages/company/vision-mission.module.css';
import SectionTitle from "./SectionTitle"
import ImageCard from "./ImageCard"
import DescriptionCard from "./DescriptionCard"

export default function VisionMissionContent() { 
  return (
    <div className={styles.container}>
      {/* Global Standard in AI-ENGINEERING */}
      <section className={styles.aiEngineeringSection}>
        <SectionTitle
          title={
            <>
              Global Standard in&nbsp;
              <br className={styles.brForMobile} />
              <span>AI-Engineering</span>
            </>
          }
          description={
            <>
              데이터와 물리 법칙을 결합한 우리만의 기술로 산업 현장의 복잡한 문제를 해결합니다.
              <br />
              에너지 효율화는 물론, 사람과 환경이 함께하는 탄소 중립 사회를 위한 기술 표준을 만들어갑니다.
            </>            
          }
        />

        <div className={`${styles.flexBox} ${styles.visionMissionBox}`}>
          <ImageCard
            image={{
              src: "/images/about/mission-1.png",
              alt: "기술의 한계를 넘는 융합 혁신",
            }}
            title={"기술의 한계를 넘는 융합 혁신"}
            description={`
              Hyper-scale AI의 빠른 연산 능력과 수치해석(CFD)의 정밀함을 결합하여,
              기존 방식으로는 불가능했던 산업 전반의 정밀한 에너지 최적화를 실현합니다.
            `}
          />

          <ImageCard
            image={{
              src: "/images/about/mission-2.png",
              alt: "데이터로 증명하는 Net Zero 생태계",
            }}
            title={"데이터로 증명하는 Net Zero 생태계"}
            description={`
              우리는 MRV 기반의 정량적 데이터를 통해 현실적이고 효율적인 탄소중립 로드맵을 제시합니다.
            `}
          />
        </div>
      </section>

      {/* 고객과 함께하는 동행의 핵심 미션 */}
      <section>
        <SectionTitle
          title={
            <>
              고객과 함께하는&nbsp;
              <br className={styles.brForMobile} />
              <span>핵심 미션</span>
            </>
          }
          description={
            "고객과 함께 최적화 여정을 시작하고 성공적으로 완수해 나가겠습니다."
          }
        />

        <div className={`${styles.flexBox} ${styles.visionMissionBox}`}>
          <div className={styles.valueCard}>
            <div className={styles.valueHeader}>
              <span className={styles.valueLabel}>Value for Customers</span>
              <img
                className={styles.valueImage}
                src="/images/about/mission-3.png"
                alt="미션 3"
              />
            </div>
            <div className={styles.titleWrap}>
              <h3 className={styles.valueTitle}>
                고객의 성공을 위한 전략적 최적화
              </h3>
              <p className={styles.valueDescription}>
                우리의 기술은 고객의 실질적인 이익으로 연결되어야 합니다.
                <br />
                JHAION 엔진으로 운영 효율을 높이고, 에너지 비용과 탄소 배출을 동시에 줄여 고객의 비즈니스 경쟁력을 명확한 수치로 향상시킵니다.
              </p>
            </div>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueHeader}>
              <span className={styles.valueLabel}>Value for Society</span>
              <img
                className={styles.valueImage}
                src="/images/about/mission-4.png"
                alt="미션 4"
              />              
            </div>
            <div className={styles.titleWrap}>
              <h3 className={styles.valueTitle}>
                지속 가능한 미래를 위한 기술적 책임
              </h3>
              <p className={styles.valueDescription}>
                기술의 발전은 환경을 해치지 않아야 합니다.
                <br />
                건물부터 도시, 산업 현장까지 에너지 흐름을 눈에 보이게 하고 효율적으로 관리하여, 다음 세대를 위한 깨끗하고 안전한 환경을 만드는 데 앞장섭니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 기술 혁신을 이끄는 핵심 가치 */}
      <section className={styles.valuesSection}>
        <SectionTitle
          title={
            <>
              기술 혁신을 이끄는&nbsp;
              <br className={styles.brForMobile} />
              <span>핵심 가치</span>
            </>
          }
          description={
            "AI 기반의 독보적인 기술력으로 지속 가능한 미래를 이끄는 글로벌 파트너가 되겠습니다."
          }
        />

        <div className={styles.flexBoxWithPlus}>
          <DescriptionCard
            imageSrc={"/images/about/mission-5.png"}
            imageAlt={"융합적 전문성"}
            title={"융합적 전문성"}
            description={
              <>
                우리는 IT와 공학의 경계를 허뭅니다.<br />
                AI 엔지니어와 도메인 전문가의 협업을 통해, 단순히 데이터를 읽는 것을 넘어 물리적 현상의 원인까지 규명하는 깊이 있는 솔루션을 만듭니다.
              </>
            }
            className={styles.firstCard}
          />
          <PlusIconWithFlex />
          <DescriptionCard
            imageSrc={"/images/about/mission-6.png"}
            imageAlt={"혁신적 선도성"}
            title={"혁신적 선도성"}
            description={
              <>
                새로운 길을 개척하는 것을 두려워하지 않습니다.<br />
                기존 시장에 없던 Hyper scale AI 기반 자율 운영 모델을 제시하며, 글로벌 에너지 기술의 새로운 기준을 만들어갑니다.
              </>
            }
          />
          <PlusIconWithFlex />
          <DescriptionCard
            imageSrc={"/images/about/mission-7.png"}
            imageAlt={"검증된 신뢰성"}
            title={"검증된 신뢰성"}
            description={
              <>
                결과는 반드시 증명되어야 합니다.<br />
                수많은 시뮬레이션(Simulation)과 실제 적용 사례를 통해 예측의 정확성을 보장하며, 고객과의 약속을 끝까지 지킵니다.
              </>
            }
          />
        </div>
      </section>
    </div>
  )
}

function PlusIconWithFlex () {
  return (
    <div className={styles.plusImageContainer}>
      <img
        src="/images/about/mission_plus.png"
        width={'40px'}
        height={'40px'}
        alt="플러스"
      />
    </div>
  )
}
