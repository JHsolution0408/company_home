import React from "react"
import * as styles from "../../pages/company/vision-mission.module.css"
import SectionTitle from "./SectionTitle"
import ImageCard from "./ImageCard"
import DescriptionCard from "./DescriptionCard"
import PlusIconWithFlex from "./PlusIconWithFlex"

export default function PartnersContent() {
  return (
    <div className={styles.container}>
      {/* 혁신 시너지를 창출하는 협력 철학 */}
      <section>
        <SectionTitle
          title={
            <>
              혁신 시너지를 창출하는&nbsp;
              <br className={styles.brForMobile} />
              <span>협력 철학</span>
            </>
          }
          description={`단독이 아닌 파트너들과 함께 기술적 시너지를 창출하여 시장의 혁신을 주도하겠습니다.`}
        />

        <div className={styles.flexBox}>
          <ImageCard
            image={{
              src: "/images/partners/partner1.png",
              alt: "AI 생태계 확장을 위한 공동의 목표",
            }}
            title={"AI 생태계 확장을 위한 공동의 목표"}
            description={`
              JHAION 엔진은 학계, 산업계, 플랫폼 전문가와의 유기적인 협력을 통해 완성됩니다. 우리는 함께 기술적 한계를 극복하고 고객에게 최적의 솔루션을 제공하는 것을 공동의 목표로 삼습니다.
            `}
          />

          <ImageCard
            image={{
              src: "/images/partners/partner2.png",
              alt: "NET-ZERO 전환이라는 시대적 가치 실현",
            }}
            title={"NET-ZERO 전환이라는 시대적 가치 실현"}
            description={`
              기술 개발의 궁극적인 목적을 지속 가능한 미래 설계에 두고 있습니다. 파트너들과 함께 환경적 가치를 실현하는 데 집중하고 있습니다.
            `}
          />
        </div>
      </section>

      {/* JHAION의 분야별 네트워크 구성 */}
      <section>
        <SectionTitle
          title={
            <>
              JHAION의 분야별 <span>네트워크 구성</span>
            </>
          }
          description={
            "핵심 기술력 확보와 산업 적용 확대를 위해 입체적인 파트너십을 구축했습니다."
          }
        />

        <div className={styles.flexBoxWithPlus}>
          <DescriptionCard
            imageSrc={"/images/partners/network_icon1.png"}
            imageAlt={"기술 파트너"}
            title={"기술 파트너"}
            description={
              "HYPER-SCALE AI 기술 및 플랫폼 개발을 공동 연구하는 핵심 IT 기업 및 연구소와의 협력을 통해 기술의 깊이와 속도를 확보하고 있습니다."
            }
          />
          <PlusIconWithFlex />
          <DescriptionCard
            imageSrc={"/images/partners/network_icon2.png"}
            imageAlt={"산업 적용 파트너"}
            title={"산업 적용 파트너"}
            description={
              "AI+플랫폼(에너지, 설비 안전, 자율 운영)을 실제 산업 현장에 적용하는 선도적인 고객사 및 엔지니어링 파트너와 긴밀히 협력하고 있습니다."
            }
          />
          <PlusIconWithFlex />
          <DescriptionCard
            imageSrc={"/images/partners/network_icon3.png"}
            imageAlt={"학술/연구 파트너"}
            title={"학술/연구 파트너"}
            description={
              "AI 및 CFD 분야의 최신 이론과 동향을 연구하고 기술 검증을 수행하는 국내외 유수의 대학 및 전문 연구기관과 협력하고 있습니다."
            }
          />
        </div>
      </section>
    </div>
  )
}

