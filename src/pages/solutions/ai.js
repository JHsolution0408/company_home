import * as React from "react";
import SubPageHeader from "../../components/subpage-header";
import Seo from "../../components/seo";
import Footer from "../../components/footer";
import { graphql } from "gatsby";
import * as styles from "./ai.module.css";

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
  const { frontmatter, html } = data.markdownRemark;
  return (
    <>
      <SubPageHeader bgImage="/images/about/bg_vision.png" />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div id="title-meta" className={styles.titleMeta}>
            <div id="title-text" className={styles.titleText}>
              <h1 className={styles.title}>{frontmatter.title}</h1>
              <p className={styles.subtitle}>
                {frontmatter.description}
              </p>
            </div>
          </div>
          <div id="content-md" className={styles.contentMd}>
            <div
              dangerouslySetInnerHTML={{
                __html: html
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const Head = () => <Seo title="AI" />;

export default AiPage;
