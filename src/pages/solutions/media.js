import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import * as styles from "../company/vision-mission.module.css";
import SectionTitle from "../../components/template/SectionTitle"
import ImageCard from "../../components/template/ImageCard"


export const query = graphql`
  query MediaPageQuery {
    markdownRemark(fileAbsolutePath: { regex: "/media.md$/" }) {
      frontmatter {
        title
        description
        slug
      }
      html
    }
  }
`;

const MediaPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      type={'dark'}
      subHeaderTitle={frontmatter.title}
      subHeaderDescription={frontmatter.description}
      subHeaderBgImage="/images/banners/bg_media.png"
    >
      <div className={styles.container}>
          {/* 다양한 데이터를 시각 경험으로 전환하는 미디어의 핵심 구성 */}
          <section>
            <SectionTitle
              title={
                <>
                  다양한 데이터를 시각 경험으로 전환하는&nbsp;
                  <span>미디어의 핵심 구성</span>
                </>
              }
              description={`고해상도 렌더링의 사실성과 인터랙티브 UI의 유연성을 결합하여 데이터를 생생한 시각 경험으로 전달합니다.`}
            />

            <div className={styles.flexBox}>
              <ImageCard
                image={{
                  src: "/images/solutions/card_ai1.png",
                  alt: "에너지 효율 최적화",
                }}
                title={"에너지 효율 최적화"}
                description={`실시간 데이터 학습을 통해 에너지 소비 패턴을 분석하고, 설비 운전 부하를 AI가 능동적으로 조절하여 탄소 배출과 비용을 절감합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_ai2.png",
                  alt: "OCR 데이터 자산화",
                }}
                title={"OCR 데이터 자산화"}
                description={`현장에 방치된 아날로그 계기판, 수기 기록, 도면 정보를 AI 시각 지능으로 판독하여 시스템이 분석 가능한 디지털 자산으로 변환합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_ai3.png",
                  alt: "설비 예지보전",
                }}
                title={"설비 예지보전"}
                description={`설비의 진동, 소음, 온도 데이터를 분석하여 고장 징후를 사전에 포착합니다. 돌발 정지를 막고 유지보수 비용을 획기적으로 낮춥니다.`}
              />
            </div>
          </section>
      </div>
    </Layout>
  );
};

export const Head = () => <Seo title="미디어" />;

export default MediaPage;

