import * as React from "react";
import SubPageHeader from "../../components/subpage-header";
import Seo from "../../components/seo";
import Footer from "../../components/footer";
import { graphql } from "gatsby";

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
    <>
      <SubPageHeader bgImage="/images/about/bg_vision.png" />
      <main style={{ padding: 0 }}>
        <div style={{ width: "100%", margin: 0, padding: 0 }}>
          <div id="vision-mission-meta" style={{ marginBottom: "32px", backgroundImage: 'url(/images/about/bg_vision.png)', backgroundSize: 'cover', backgroundPosition: 'center', padding: "60px 20px 60px 50px" }}>
            <h1 style={{ color: "#FDFDFD", fontSize: "40px", fontWeight: 700, marginBottom: "2px" }}>{frontmatter.title}</h1>
            <p style={{ color: "rgba(253, 253, 253, 0.60)", fontSize: "20px", fontWeight: 600, marginTop: 0 }}>{frontmatter.description}</p>
          </div>
          <div id="vision-mission-markdown" style={{ width: "100%", marginTop: "0 !important", padding: "15px 24px 15px 5%" }}>
            <style>{`
              #vision-mission-markdown h2 {
                font-size: 40px;
                color: #17181B;
                font-weight: 550;
                margin-top: 40px;
                margin-bottom: 16px;
              }
              #vision-mission-markdown h2 + p {
                max-width: 1100px;
                width: 100%;
                margin-left: 0;
                margin-right: 0;
                font-size: 20px;
                line-height: 1.8;
              }
              #vision-mission-markdown strong, #vision-mission-markdown b {
                color: #17181B;
                font-size: 24px;
                font-weight: 600;
                padding-left: 1%;
                vertical-align: top;
                padding-top: 1%;
              }
              #vision-mission-markdown .ai-engineering {
                color: #177D3C;
                font-weight: 700;
              }
              #vision-mission-markdown table td {
                padding: 10px 1%;
              }
              #vision-mission-markdown table th {
                padding: 1%;
              }
              #vision-mission-markdown table:nth-of-type(2) {
                background-color: #F6FEF9;
              }
            `}</style>
            <div
              dangerouslySetInnerHTML={{
                __html: html
                  .replace('AI-ENGINEERING', '<span class="ai-engineering">AI-ENGINEERING</span>')
                  .replace(/(>[^<]*미션[^<]*<)/g, match => match.replace('미션', '<span style=\"color:#177D3C;font-weight:700;\">미션</span>'))
                  .replace(/(>[^<]*핵심가치[^<]*<)/g, match => match.replace('핵심가치', '<span style=\"color:#177D3C;font-weight:700;\">핵심가치</span>'))
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const Head = () => <Seo title="비전 및 미션" />;

export default VisionMissionPage;
