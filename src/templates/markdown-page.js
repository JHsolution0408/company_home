import * as React from "react"
import { graphql } from "gatsby"

import SubPageHeader from "../components/subpage-header"
import Seo from "../components/seo"
import Footer from "../components/footer"


const MarkdownBody = ({ html }) => {
  if (!html) {
    return <p style={{ color: "#c00" }}>콘텐츠를 불러오는 중 문제가 발생했습니다.</p>;
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};


const MarkdownPage = ({ data }) => {
  const node = data.markdownRemark;
  const { title, description, slug } = node.frontmatter;
  // 비전/미션 스타일 참고: 헤더, 배경, 마크다운 영역 스타일, h2/p/bold 등
  return (
    <>
      <SubPageHeader bgImage={slug === "vision-mission" ? "/images/about/bg_vision.png" : undefined} />
      <main style={{ padding: 0 }}>
        <div style={{ width: "100%", margin: 0, padding: 0 }}>
          <div id="vision-mission-meta" style={{ marginBottom: "32px", backgroundImage: 'url(/images/about/bg_vision.png)', backgroundSize: 'cover', backgroundPosition: 'center', padding: "60px 20px 60px 50px" }}>
            <h1 style={{ color: "#FDFDFD", fontSize: "40px", fontWeight: 700, marginBottom: "2px" }}>{title}</h1>
            {description && (
              <p style={{ color: "rgba(253, 253, 253, 0.60)", fontSize: "20px", fontWeight: 600, marginTop: 0 }}>{description}</p>
            )}
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
              #vision-mission-markdown p + h2 {
                margin-top: 4px !important;
              }
              #vision-mission-markdown span[style*="color:#177D3C"] + h2 {
                margin-top: 0px !important;
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
            <MarkdownBody html={
              node.html
                .replace(/(문제인식\s*\(\s*The Challenge\s*\))/g, '<span style="color:#177D3C;font-size:24px;font-weight:600;margin-bottom:-1px;display:inline-block;">$1</span>')
                .replace(/(기술적 해답\s*\(\s*The Solution\s*\))/g, '<span style="color:#177D3C;font-size:24px;font-weight:600;margin-bottom:-1px;display:inline-block;">$1</span>')
                .replace(/(궁극적 목표\s*\(\s*The Impact\s*\))/g, '<span style="color:#177D3C;font-size:24px;font-weight:600;margin-bottom:-1px;display:inline-block;">$1</span>')
                .replace(/<img([^>]*)>/g, '<img$1 style="border-radius:16px;">')
            } />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const query = graphql`
  query MarkdownPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.markdownRemark.frontmatter.title} />

export default MarkdownPage
