
import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import JhaionEngineContent from "../../components/template/JhaionEngineContent.jsx";
import * as styles from "../company/vision-mission.module.css";


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
      <section className={styles.container}>
        <JhaionEngineContent />
      </section>
    </Layout>
  );
};

export const Head = () => <Seo title="JHAION 엔진" />;

export default JhaionEnginePage;
