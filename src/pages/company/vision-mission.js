import * as React from "react";
import Seo from "../../components/seo";
import { graphql } from "gatsby";
import * as styles from "./vision-mission.module.css";
import Layout from "../../components/layout"

export const query = graphql`
  query VisionMissionQuery {
    markdownRemark(fileAbsolutePath: { regex: "/vision-mission.md$/" }) {
      frontmatter {
        title
        description
        slug
      }
      html
    }
  }
`;

const VisionMissionPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;

  const highlightedHtml = html
    .replace(
      'AI-ENGINEERING',
      `<span class="${styles.vm__highlight}">AI-ENGINEERING</span>`
    )
    .replace(/(>[^<]*미션[^<]*<)/g, (match) =>
      match.replace(
        '미션',
        `<span class="${styles.vm__highlight}">미션</span>`
      )
    )
    .replace(/(>[^<]*핵심가치[^<]*<)/g, (match) =>
      match.replace(
        '핵심가치',
        `<span class="${styles.vm__highlight}">핵심가치</span>`
      )
    );

  return (
    <Layout type={'dark'}>
      <main className={styles.vm}>
        <div className={styles.vm__content}>
          <section className={styles.vm__meta}>
            <div className={styles.vm__text}>
              <h1 className={styles.vm__title}>
                {frontmatter.title}
              </h1>
              <p className={styles.vm__subtitle}>
                우리는 데이터와 물리 법칙을 융합한 독자적인 기술로 산업의 난제를 해결합니다.
                에너지 최적화를 넘어, 인류와 공존하는 탄소 중립 사회의 기술적 표준이 되겠습니다.
              </p>
            </div>
          </section>
          <section className={styles.vm__body}>
            <div
              dangerouslySetInnerHTML={{
                __html: highlightedHtml,
              }}
            />
          </section>
        </div>
      </main>
    </Layout>
  );
};

export const Head = () => <Seo title="비전 및 미션" />;

export default VisionMissionPage;
