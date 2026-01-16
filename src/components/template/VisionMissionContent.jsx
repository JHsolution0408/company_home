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
              <span>AI-ENGINEERING</span>
            </>
          }
          description={`
            우리는 데이터와 물리 법칙을 융합한 독자적인 기술로 산업의 난제를 해결합니다.
            에너지 최적화를 넘어, 인류와 환경이 공존하는 탄소 중립 사회의 기술적 표준이 되겠습니다.
          `}
        />

        <div className={styles.flexBox}>
          <ImageCard
            image={{
              src: "/images/about/mission-1.png",
              alt: "기술의 한계를 넘는 융합 혁신",
            }}
            title={"기술의 한계를 넘는 융합 혁신"}
            description={`
              Hyper-scale AI의 연산력에 CFD(수치해석)의 정밀함을 더해,
              기존 방식으로는 불가능했던 산업 전반의 초정밀 에너지 최적화를 실현합니다.
            `}
          />

          <ImageCard
            image={{
              src: "/images/about/mission-2.png",
              alt: "데이터로 증명하는 Net-Zero 생태계",
            }}
            title={"데이터로 증명하는 Net-Zero 생태계"}
            description={`
              막연한 선언이 아닌, 측정 가능하고 검증된 데이터(MRV)를 기반으로
              가장 현실적이고 경제적인 탄소 중립 로드맵을 완성합니다.
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

        <div className={styles.flexBox}>
          <div className={styles.valueCard}>
            <div className={styles.valueHeader}>
              <span className={styles.valueLabel}>Value for Customers</span>
              <img
                className={styles.valueImage}
                src="/images/about/mission-3.png"
                alt="미션 3"
              />
            </div>
            <div>
              <h3 className={styles.valueTitle}>
                고객의 성공을 위한 정략적 최적화
              </h3>
              <p className={styles.valueDescription}>
                우리의 기술은 고객의 이익으로 귀결되어야 합니다. JHAION 엔진으로
                운영 효율을 극대화하고, 에너지 비용과 탄소 배출을 동시에 저감하여
                고객의 비즈니스 경쟁력을 가장 확실한 수치로 높입니다.
              </p>
            </div>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueHeader}>
              <img
                className={styles.valueImage}
                src="/images/about/mission-4.png"
                alt="미션 4"
              />
              <span className={styles.valueLabel}>Value for Society</span>
            </div>
            <div>
              <h3 className={styles.valueTitle}>
                지속 가능한 미래를 위한 기술적 책임
              </h3>
              <p className={styles.valueDescription}>
                기술의 진보는 환경을 해치지 않아야 합니다. 건물부터 도시, 산업
                현장까지 에너지 흐름을 투명하게 시각화하고 제어하여, 다음 세대를
                위한 깨끗하고 안전한 환경을 구축하는데 앞장섭니다.
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
            "AI 기반의 독보적인 기술 역량으로 지속 가능한 미래를 선도하는 글로벌 파트너가 되겠습니다."
          }
        />

        <div className={styles.flexBoxWithPlus}>
          <DescriptionCard
            imageSrc={"/images/about/mission-5.png"}
            imageAlt={"융합적 전문성"}
            title={"융합적 전문성"}
            description={
              "우리는 IT와 공학의 경계를 허뭅니다. AI 엔지니어와 도메인 전문가의 협업을 통해, 단순히 데이터를 읽는 것을 넘어 물리적 현상의 원인까지 규명하는 깊이 있는 솔루션을 만듭니다."
            }
          />
          <PlusIconWithFlex />
          <DescriptionCard
            imageSrc={"/images/about/mission-6.png"}
            imageAlt={"혁신적 선도성"}
            title={"혁신적 선도성"}
            description={
              "남들이 가지 않은 길을 두려워하지 않습니다. 기존 시장에 없던 Hyper-scale AI 기반의 자율 운영 모델을 제시하며, 글로벌 에너지 기술 패러다임을 주도합니다."
            }
          />
          <PlusIconWithFlex />
          <DescriptionCard
            imageSrc={"/images/about/mission-7.png"}
            imageAlt={"검증된 신뢰성"}
            title={"검증된 신뢰성"}
            description={
              '결과는 반드시 증명되어야 합니다. 수많은 시뮬레이션(Digital Twin)과 실증 사례를 통해 예측의 정확도를 보장하며, 고객에게 약속한 효율을 끝까지 책임집니다.'
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
