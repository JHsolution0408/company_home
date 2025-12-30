
import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import * as styles from "../company/vision-mission.module.css";
import SectionTitle from "../../components/template/SectionTitle"
import ImageCard from "../../components/template/ImageCard"

export const query = graphql`
  query JhaionEnginePageQuery {
    markdownRemark(fileAbsolutePath: { regex: "/jhaion-engine.md$/" }) {
      frontmatter {
        title
        description
        slug
      }
      html
    }
  }
`;

const JhaionEnginePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      type={'dark'}
      subHeaderTitle={frontmatter.title}
      subHeaderDescription={frontmatter.description}
      subHeaderBgImage="/images/solutions/card_jhaion1.png"
    >
      <div className={styles.container}>
          {/* 압도적인 성능을 구현하는 엔진의 핵심 구성 */}
          <section>
            <SectionTitle
              title={
                <>
                  압도적인 성능을 구현하는 엔진의&nbsp;
                  <span>핵심 구성</span>
                </>
              }
              description={`기존 기술의 한계를 돌파하는 세가지 핵심 시굴이 유기적으로 결합되어 있습니다.`}
            />

            <div className={styles.flexBox}>
              <ImageCard
                image={{
                  src: "/images/solutions/card_jhaion1.png",
                  alt: "Hyper-scale AI(초거대 AI)",
                }}
                title={"Hyper-scale AI(초거대 AI)"}
                description={`
              산업·도시의 방대한 비정형 데이터를 실시간 학습·처리하며,
              기존 AI를 넘어 복잡한 변수 상관관계를 스스로 파악하는 고도화된 추론 능력을 갖췄습니다.
            `}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_jhaion2.png",
                  alt: "Net-Zero 최적화 알고리즘",
                }}
                title={"Net-Zero 최적화 알고리즘"}
                description={`
                  에너지 소비를 최소화하면서 생산성과 쾌적함을 유지하는 최적 운영 포인트를 찾습니다.
                  탄소 저감을 우선하는 알고리즘으로 Net-Zero를 가속화합니다.
                `}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_jhaion3.png",
                  alt: "데이터 기반 시뮬레이션 기술",
                }}
                title={"데이터 기반 시뮬레이션 기술"}
                description={`
                  실제 운영 데이터를 기반으로 가상 환경에서 시뮬레이션해 예측 정확도를 높입니다.
                  물리 법칙을 학습한 AI가 현장과 오차 없는 결과를 제공합니다
                `}
              />
            </div>
          </section>
      </div>
    </Layout>
  );
};

export const Head = () => <Seo title="JHAION 엔진" />;

export default JhaionEnginePage;
