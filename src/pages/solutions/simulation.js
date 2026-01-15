
import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import * as styles from "../company/vision-mission.module.css";
import SectionTitle from "../../components/template/SectionTitle"
import ImageCard from "../../components/template/ImageCard"


export const query = graphql`
  query SimulationPageQuery {
    markdownRemark(fileAbsolutePath: { regex: "/simulation.md$/" }) {
      frontmatter {
        title
        description
        slug
      }
      html
    }
  }
`;

const SimulationPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      type={'light'}
      subHeaderTitle={frontmatter.title}
      subHeaderDescription={frontmatter.description}
      subHeaderBgImage="/images/banners/bg_simulation.png"
    >
      <div className={styles.container}>
        {/* 압도적인 성능을 구현하는 엔진의 핵심 구성 */}
        <section>
          <SectionTitle
            title={
              <>
                보이지 않는 물리 현상을 제현하는&nbsp;
                <span>시뮬레이션의 핵심 구성</span>
              </>
            }
            description={`복잡한 물리 환경을 정밀하게 재현하고 분석하는 가상모델 기술이 미래 운영 지능의 기반이 됩니다.`}
          />

          <div className={styles.flexBox}>
            <ImageCard
              image={{
                src: "/images/solutions/card_sim1.png",
                alt: "CAE 시뮬레이션 (Computer Aided Engineering)",
              }}
              title={"CAE 시뮬레이션 (Computer Aided Engineering)"}
              description={`공기 흐름·열·응력 등 다양한 물리 현상을 3D로 시각화해 분석하며, 발열·공기질·구조 취약점 등 복합 공학 문제를 통합적으로 해석합니다.`}
            />

            <ImageCard
              image={{
                src: "/images/solutions/card_sim2.png",
                alt: "AI 기반 예측 (AI Prediction)",
              }}
              title={"AI 기반 예측 (AI Prediction)"}
              description={`AI가 과거 데이터와 시뮬레이션을 학습해 설계 취약점과 에너지 소비를 미리 예측하며, 최적화 해석으로 문제 발생 전에 선제 대응(PdM)이 가능합니다.`}
            />

            <ImageCard
              image={{
                src: "/images/solutions/card_sim3.png",
                alt: "MRV 시스템 (Measurement, Reporting, Verification)",
              }}
              title={"MRV 시스템 (Measurement, Reporting, Verification)"}
              description={`탄소 감축 활동의 측정(M)·보고(R)·검증(V) 전 과정을 시스템화합니다. 국제적으로 인정받을 수 있는 투명하고 신뢰성 높은 데이터를 생성합니다.`}
            />
          </div>
        </section>

        {/* 효율적이고 정밀한 시뮬레이션 솔루션 */}
        <section>
          <SectionTitle
            title={
              <>
                효율적이고 정밀한&nbsp;
                <span>시뮬레이션 솔루션</span>
              </>
            }
            description={`최적설계, 고효율, 친환경을 핵심 가치로 삼아 정밀 시뮬레이션을 통해 리스크와 비용을 최소화하고 탄소중립 실현을 앞당깁니다.`}
          />

          <div className={styles.flexBox}>
            <ImageCard
              image={{
                src: "/images/solutions/card_sim4.png",
                alt: "정밀 해석 전문성",
              }}
              title={"정밀 해석 전문성"}
              description={`열유동·다상유동·기후 환경 등 복잡한 물리 현상을 정밀하게 해석하는 기술력을 보유하고, 실험·현장 데이터 비교를 통해 결과의 신뢰성을 검증합니다.`}
            />

            <ImageCard
              image={{
                src: "/images/solutions/card_sim5.png",
                alt: "대규모 해석 역량",
              }}
              title={"대규모 해석 역량"}
              description={`HPC 기반으로 대규모 격자 해석과 장시간 시뮬레이션을 수행하며, 산업 설비부터 도시 규모까지 폭넓게 적용해 온 경험을 보유합니다.`}
            />

            <ImageCard
              image={{
                src: "/images/solutions/card_sim6.png",
                alt: "융합적 적용 능력",
              }}
              title={"융합적 적용 능력"}
              description={`단일 부품부터 산업 설비·건물 유동·기후·에너지 시스템까지 통합 해석이 가능하며, 고객 맞춤형 최적화 솔루션을 제공합니다.`}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const Head = () => <Seo title="시뮬레이션" />;

export default SimulationPage;
