import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "../pages/company/vision-mission.module.css"

// 프로젝트 상세 템플릿
const ProjectDetailBody = ({ html }) => {
  if (!html) {
    return <p style={{ color: "#c00" }}>콘텐츠를 불러오는 중 문제가 발생했습니다.</p>
  }
  // 프로젝트 문서에서 자주 쓰는 섹션 제목을 강조
  const transformed = String(html)
    .replace(/(개요\s*\(\s*Challenge\s*\))/g, '<span style="color:#177D3C;font-size:20px;font-weight:700;display:inline-block;">$1</span>')
    .replace(/(과제\s*&\s*범위\s*\(\s*Project\s*\))/g, '<span style="color:#177D3C;font-size:20px;font-weight:700;display:inline-block;">$1</span>')
    .replace(/(성과\s*\(\s*Result\s*\))/g, '<span style="color:#177D3C;font-size:20px;font-weight:700;display:inline-block;">$1</span>')
    // 이미지에 둥근 모서리 적용
    .replace(/<img([^>]*)>/g, '<img$1 style="border-radius:16px;">')

  return <div dangerouslySetInnerHTML={{ __html: transformed }} />
}

const ProjectDetailPage = ({ data }) => {
  const node = data.markdownRemark
  const { title, description, date, featureImage } = node.frontmatter

  return (
    <Layout
      type="dark"
      subHeaderTitle="프로젝트"
      subHeaderDescription={description || "혁신적인 기술로 만들어가는 JH솔루션의 프로젝트"}
      subHeaderBgImage="/images/bg_vision.png"
    >
      <section className={styles.container}>
        {/* TODO: 테스트중, 추후 제거 필요*/}
        <h1>프로젝트 상세 페이지입니다.</h1>

        <h1>{title}</h1>
        {date && <p style={{ color: "#9AA0A6", marginTop: -8 }}>{date}</p>}
        <hr />

        {featureImage && (
          <img
            src={featureImage}
            alt={title}
            style={{
              margin: "0 auto 24px",
              width: "100%",
              maxWidth: "720px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "16px",
            }}
          />
        )}

        <ProjectDetailBody html={node.html} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query ProjectDetail($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date
        description
        featureImage
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
)

export default ProjectDetailPage
