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

  return (
    <Layout
      type={'dark'}
      subHeaderTitle={frontmatter.title}
      subHeaderDescription={'초거대 AI와 공학의 만남, 지속 가능한 내일을 가장 정밀하게 설계합니다.'}
      subHeaderBgImage="/images/bg_vision.png"
    >
      <main className={styles.vm}>
        <div className={styles.vm__content}>
          <section className={styles.vm__body}>
            <div
              dangerouslySetInnerHTML={{
                __html: html,
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
