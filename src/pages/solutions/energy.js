
import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import SectionTitle from "../../components/template/SectionTitle"
import ImageCard from "../../components/template/ImageCard"
import * as styles from '../../pages/company/vision-mission.module.css';

export const query = graphql`
  query EnergyPageQuery {
    markdownRemark(fileAbsolutePath: { regex: "/energy.md$/" }) {
      frontmatter {
        title
        description
        slug
      }
      html
    }
  }
`;

const EnergyManagementPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout
      type={'light'}
      subHeaderTitle={frontmatter.title}
      subHeaderDescription={frontmatter.description}
      subHeaderBgImage="/images/banners/bg_project.png"
    >
      <div className={styles.container}>
          {/* 압도적인 성능을 구현하는 엔진의 핵심 구성 */}
          <section>
            <SectionTitle
              title={
                <>
                  지능형 에너지 관리를 구현하는&nbsp;
                  <span>핵심 구성</span>
                </>
              }
              description={`데이터 기반의 정략적 관리 시스템을 통해 고객의 재무적, 환경적 목표를 달성하겠습니다`}
            />

            <div className={styles.flexBox}>
              <ImageCard
                image={{
                  src: "/images/solutions/card_energy1.png",
                  alt: "탄소회계",
                }}
                title={"탄소회계"}
                description={`복잡한 탄소 배출원을 자동으로 식별하고, 국제 표준에 맞춘 배출량 산정 및 리포팅을 자동화합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_energy2.png",
                  alt: "ESG 대응",
                }}
                title={"ESG 대응"}
                description={`기업의 에너지 사용 데이터를 분석하여 환경(E) 지표 관리를 돕고, 글로벌 이니셔티브(RE100 등) 대응을 위한 객관적 데이터를 제공합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_energy3.png",
                  alt: "효율 최적화",
                }}
                title={"효율 최적화"}
                description={`설비의 운전 효율을 실시간으로 분석하여 낭비되는 에너지를 차단하고, 피크 부하를 제어하여 전력 비용을 절감합니다.`}
              />
            </div>
          </section>

          {/* 다양한 공간에 확장되는 에너지 관리 솔루션 */}
          <section>
            <SectionTitle
              title={
                <>
                  다양한 공간에 확장되는&nbsp;
                  <span>에너지 관리 솔루션</span>
                </>
              }
              description={`건물, 공장, 주택, 커뮤니티 등 모든 환경에 특화된 솔루션을 제공합니다`}
            />

            <div className={styles.flexBox}>
              <ImageCard
                image={{
                  src: "/images/solutions/card_energyBEMS.png",
                  alt: "BEMS (Building)",
                }}
                title={"BEMS (Building)"}
                description={`건물의 공조·조명·전력을 통합 제어해 쾌적한 환경과 에너지 절감을 실현하는 빌딩 에너지 관리 시스템입니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_energyHEMS.png",
                  alt: "HEMS (Home)",
                }}
                title={"HEMS (Home)"}
                description={`가정 내 IoT 기기와 연동해 전력 소비를 관리하고 AI가 생활패턴에 맞춰 에너지를 절약하는 시스템입니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_energyFEMS.png",
                  alt: "FEMS (Factory)",
                }}
                title={"FEMS (Factory)"}
                description={`생산 설비와 유틸리티를 최적화 해 생산성을 유지하면서 에너지 비용을 낮추는 공장 에너지 관리 시스템입니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_energyCEMS.png",
                  alt: "CEMS (Community)",
                }}
                title={"CEMS (Community)"}
                description={`산업단지,도시 단위의 에너지를 통합 관제하고 잉여 에너지를 공유.거래하는 지역 에너지 관리 시스템입니다.`}
              />
            </div>
          </section>
      </div>
    </Layout>
  );
};

export const Head = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Seo 
      title={frontmatter.title}
      description={frontmatter.description}
    />
  );
}

export default EnergyManagementPage;

