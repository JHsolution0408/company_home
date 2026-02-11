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
              혁신 시너지를 함께 만드는&nbsp;
              <br className={styles.brForMobile} />
              <span>협력 철학</span>
            </>
          }
          description={`파트너와 함께 연구·검증하며 더 빠르게 혁신을 만들어갑니다.`}
        />

        <div className={`${styles.flexBox} ${styles.partnersFlexBox}`}>
          <ImageCard
            image={{
              src: "/images/partners/partner1.png",
              alt: "AI 생태계 확장을 위한 공동의 목표",
            }}
            title={"AI 생태계 확장을 위한 공동의 목표"}
            description={
              <>
                JHAION 엔진은 학계·산업계·플랫폼 전문가와 함께 만듭니다.
                <br />
                기술의 한계를 함께 넘고, 고객에게 가장 적합한 해답을 제공합니다.
              </>
            }
          />

          <ImageCard
            image={{
              src: "/images/partners/partner2.png",
              alt: "넷제로(Net Zero) 전환 실현",
            }}
            title={"넷제로(Net Zero) 전환 실현"}
            description={
              <>
                기술 개발의 목표는 지속 가능한 미래를 만들기 위함입니다.
                <br />
                또한 파트너와 함께 탄소 저감과 환경 가치를 실현합니다.
              </>
            }
          />
        </div>
      </section>

      {/* 제이에이치솔루션 분야별 파트너 네트워크 */}
      <section>
        <SectionTitle
          title={
            <>
              제이에이치솔루션 분야별
              <br />
              <span>파트너 네트워크</span>
            </>
          }
          description={
            "핵심 기술을 강화하고 적용 분야를 넓히기 위해 분야별 파트너십을 구축했습니다."
          }
        />

        <div className={styles.flexBoxWithPlus}>
          <DescriptionCard
            imageSrc={"/images/partners/network_icon1.png"}
            imageAlt={"기술 파트너"}
            title={"기술 파트너"}
            description={
              "Hyper scale AI와 플랫폼을 공동 연구하는 IT 기업·연구소와 협력해 개발 속도와 완성도를 높입니다."
            }
          />
          <PlusIconWithFlex />
          <DescriptionCard
            imageSrc={"/images/partners/network_icon2.png"}
            imageAlt={"산업 적용 파트너"}
            title={"산업 적용 파트너"}
            description={
              "에너지·설비 안전·자율 운영 솔루션을 실제 현장에 적용·검증하는 고객사 및 엔지니어링 파트너와 협력합니다."
            }
          />
          <PlusIconWithFlex />
          <DescriptionCard
            imageSrc={"/images/partners/network_icon3.png"}
            imageAlt={"학술·연구 파트너"}
            title={"학술·연구 파트너"}
            description={
              "AI와 CFD 최신 이론을 연구하고 성능을 검증하는 국내외 대학·연구기관과 함께합니다."
            }
          />
        </div>
      </section>
    </div>
  )
}

