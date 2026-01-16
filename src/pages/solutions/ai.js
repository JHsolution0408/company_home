import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import * as styles from "../company/vision-mission.module.css";
import SectionTitle from "../../components/template/SectionTitle"
import ImageCard from "../../components/template/ImageCard"


export const query = graphql`
  query AiPageQuery {
    markdownRemark(fileAbsolutePath: { regex: "/ai.md$/" }) {
      frontmatter {
        title
        description
        slug
      }
      html
    }
  }
`;

const AiPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      type={'light'}
      subHeaderTitle={frontmatter.title}
      subHeaderDescription={frontmatter.description}
      subHeaderBgImage="/images/banners/bg_ai.png"
    >
      <div className={styles.container}>
          {/* 현장의 데이터를 자산으로 만드는 산업용 AI의 핵심 기술 */}
          <section>
            <SectionTitle
              title={
                <>
                  현장의 데이터를 자산으로 만드는&nbsp;
                  <span>산업용 AI의 핵심 기술</span>
                </>
              }
              description={`아날로그 정보를 디지털화하고, 설비 고장을 사전에 예측하여 운영 효율의 정점을 실현합니다.`}
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

export const Head = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Seo 
      title={frontmatter.title}
      description={frontmatter.description}
    />
  );
}

export default AiPage;
