import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import * as styles from "../company/vision-mission.module.css";
import SectionTitle from "../../components/template/SectionTitle"
import ImageCard from "../../components/template/ImageCard"


export const query = graphql`
  query DigitalTwinPageQuery {
    markdownRemark(fileAbsolutePath: { regex: "/digital-twin.md$/" }) {
      frontmatter {
        title
        description
        slug
      }
      html
    }
  }
`;

const DigitalTwinPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      type={'dark'}
      subHeaderTitle={frontmatter.title}
      subHeaderDescription={frontmatter.description}
      subHeaderBgImage="/images/banners/bg_digitaltwin.png"
    >
      <div className={styles.container}>
          {/* 현실을 가상으로 완벽하게 동기화하는 디지털 트윈의 핵심 구성 */}
          <section>
            <SectionTitle
              title={
                <>
                  현실을 가상으로 완벽하게 동기화하는&nbsp;
                  <span>디지털 트윈의 핵심 구성</span>
                </>
              }
              description={`언리얼 엔진의 압도적 몰입감과 WebGL의 웹 접근성을 결합하여 공장과 빌딩을 통합 관제합니다.`}
            />

            <div className={styles.flexBox}>
              <ImageCard
                image={{
                  src: "/images/solutions/card_dt1.png",
                  alt: "하이브리드 시각화 환경",
                }}
                title={"하이브리드 시각화 환경"}
                description={`초실감 렌더링을 위한 '언리얼 엔진'과 웹 접근성을 높인 'WebGL' 환경을 모두 지원하여, 사용 목적에 맞는 최적의 3D 관제 시스템을 제공합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_dt2.png",
                  alt: "대상별 맞춤형 트윈 구축",
                }}
                title={"대상별 맞춤형 트윈 구축"}
                description={`생산 라인의 물류와 공정을 관제하는 '스마트 팩토리', 실내 공기질과 공간 효율을 관리하는 '스마트 오피스' 등 목적에 맞게 구축합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_dt3.png",
                  alt: "통합 제어 및 시뮬레이션",
                }}
                title={"통합 제어 및 시뮬레이션"}
                description={`가상 공간에서의 제어가 실제 설비에 즉시 반영되는 양방향 제어를 구현하고, 에너지 흐름을 시뮬레이션하여 최적 효율을 사전 검증합니다.`}
              />
            </div>
          </section>
      </div>
    </Layout>
  );
};

export const Head = () => <Seo title="디지털 트윈" />;

export default DigitalTwinPage;
