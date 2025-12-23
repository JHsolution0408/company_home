import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import VisionMissionContent from "../../components/template/VisionMissionContent.jsx";
import * as styles from "./vision-mission.module.css";

export const query = graphql`
  query VisionMissionQuery {
    allMdx(filter: { frontmatter: { slug: { eq: "vision-mission" } } }) {
      nodes {
        frontmatter {
          title
          description
          slug
        }
        body
      }
    }
  }
`;

const VisionMissionPage = ({ data }) => {
  const node = data?.allMdx?.nodes?.[0];
  const frontmatter = node?.frontmatter ?? {};
  const body = node?.body ?? "";
  console.log('vision mission data는..: ', body);

  return (
    <Layout
      type={'dark'}
      subHeaderTitle={frontmatter.title || ""}
      subHeaderDescription={'초거대 AI와 공학의 만남, 지속 가능한 내일을 가장 정밀하게 설계합니다.'}
      subHeaderBgImage="/images/bg_vision.png"
    >
      <section className={styles.container}>
        <VisionMissionContent />
      </section>
    </Layout>
  );
};

export const Head = () => <Seo title="비전 및 미션" />;

export default VisionMissionPage;
