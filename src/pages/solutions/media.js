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
                  alt: "AI Co-Pilot 및 XR 학습지원 시스템",
                }}
                title={"AI Co-Pilot 및 XR 학습지원 시스템"}
                description={`실시간 위험 감지로 산업 사고 예방 및 XR 훈련 플랫폼 통한 충분한 숙련도 향상 경험 제공`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_ai2.png",
                  alt: "XR 디코딩과 가시화 기술",
                }}
                title={"XR 디코딩과 가시화 기술"}
                description={`XR 데이터의 high-level 암호화/복호화 모듈 프레임워크 검증 및 최적화`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card_ai3.png",
                  alt: "On-Device 비전 알고리즘 고도화",
                }}
                title={"On-Device 비전 알고리즘 고도화"}
                description={`On-Device Vision 알고리즘 고도화 및 연동용 메타데이터 포맷 개발`}
              />
            </div>
          </section>
      </div>
    </Layout>
  );
};

export const Head = () => <Seo title="미디어" />;

export default MediaPage;

