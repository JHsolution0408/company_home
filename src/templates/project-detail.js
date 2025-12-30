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
  // 이미지에 둥근 모서리 적용만 공통 처리
  const transformed = String(html).replace(/<img([^>]*)>/g, '<img$1 style="border-radius:16px;">')
  return <div dangerouslySetInnerHTML={{ __html: transformed }} />
}

const Badge = ({ children }) => (
  <span
    style={{
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 999,
      background: "#EEF7F0",
      color: "#177D3C",
      fontSize: 12,
      fontWeight: 600,
      marginRight: 8,
      marginBottom: 8,
    }}
  >
    {children}
  </span>
)

const Section = ({ title, items }) => {
  if (!Array.isArray(items) || items.length === 0) return null
  return (
    <div style={{ marginTop: 24 }}>
      <h3 style={{ color: "#177D3C", fontSize: 20, fontWeight: 700 }}>{title}</h3>
      <ul style={{ marginTop: 8, paddingLeft: 18 }}>
        {items.map((it, idx) => (
          <li key={idx} style={{ lineHeight: 1.7 }}>{it}</li>
        ))}
      </ul>
    </div>
  )
}

const ProjectDetailPage = ({ data }) => {
  const node = data.markdownRemark
  const { title, description, date, featureImage, serviceName, tags, overview, scope, results } = node.frontmatter

  return (
    <Layout
      type="dark"
      subHeaderTitle="프로젝트"
      subHeaderDescription={description || "혁신적인 기술로 만들어가는 JH솔루션의 프로젝트"}
      subHeaderBgImage="/images/bg_vision.png"
    >
      <section className={styles.container}>
        {/* 헤더 영역 */}
        <h1 style={{ marginBottom: 4 }}>{title}</h1>
        {date && <p style={{ color: "#9AA0A6", marginTop: -2 }}>{date}</p>}
        <hr />

        {/* 메타 정보: 서비스명, 태그 */}
        {(serviceName || (tags && tags.length)) && (
          <div style={{ margin: "12px 0 8px" }}>
            {serviceName && (
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: "#757B82", fontWeight: 600, marginRight: 8 }}>서비스명</span>
                <span style={{ fontWeight: 600 }}>{serviceName}</span>
              </div>
            )}
            {Array.isArray(tags) && tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                {tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {featureImage && (
          <img
            src={featureImage}
            alt={title}
            style={{
              margin: "12px auto 24px",
              width: "100%",
              maxWidth: "720px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "16px",
            }}
          />
        )}

        {/* 구조화된 섹션: 개요 / 과제 & 범위 / 성과 */}
        <Section title="개요 (Challenge)" items={overview} />
        <Section title="과제 & 범위 (Project)" items={scope} />
        <Section title="성과 (Result)" items={results} />

        {/* 추가 본문(Markdown) */}
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
        serviceName
        tags
        overview
        scope
        results
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
)

export default ProjectDetailPage
