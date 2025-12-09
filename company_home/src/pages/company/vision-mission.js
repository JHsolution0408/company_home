import * as React from "react";
import SubPageHeader from "../../components/subpage-header";
import Seo from "../../components/seo";
import { graphql } from "gatsby";

export const query = graphql`
  query VisionMissionQuery {
    markdownRemark(fileAbsolutePath: { regex: "/vision-mission.md$/" }) {
      html
    }
  }
`;

const VisionMissionPage = ({ data }) => (
  <>
    <SubPageHeader bgImage="/images/about/bg_vision.png" />
    <main style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "85%", margin: "0 auto" }}>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </div>
    </main>
  </>
);

export const Head = () => <Seo title="비전 및 미션" />;

export default VisionMissionPage;
