import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "../pages/company/vision-mission.module.css"

// 공통 마크다운 템플릿 (기본)
const MarkdownBody = ({ html }) => {
  if (!html) {
    return <p style={{ color: "#c00" }}>콘텐츠를 불러오는 중 문제가 발생했습니다.</p>
  }
  const transformed = String(html).replace(/<img([^>]*)>/g, '<img$1 style="border-radius:16px;">')
  return <div dangerouslySetInnerHTML={{ __html: transformed }} />
}

const SECTION_HEADERS = {
  press: { title: "보도자료", description: "JH솔루션의 혁신과 성과를 언론을 통해 전해드립니다" },
  project: { title: "프로젝트", description: "혁신적인 기술로 만들어가는 JH솔루션의 프로젝트" },
}

const MarkdownPage = ({ data, pageContext }) => {
  const node = data.markdownRemark
  const { title, description, date, featureImage } = node.frontmatter
  const { section } = pageContext || {}
  const header = SECTION_HEADERS[section] || {}

  return (
    <Layout
      type={'dark'}
      subHeaderTitle={header.title || title}
      subHeaderDescription={header.description || description}
      subHeaderBgImage="/images/bg_vision.png"
    >
      <section className={styles.container}>
        <h1>{title}</h1>
        {date && <p style={{ color: "#9AA0A6", marginTop: -8 }}>{date}</p>}

        <hr />

        {featureImage && (
          <img
            src={featureImage}
            alt={title}
            style={{
              margin: '0 auto 24px',
              width: '100%',
              maxWidth: '720px',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '16px',
            }}
          />
        )}
        <MarkdownBody html={node.html} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query MarkdownPage($id: String!) {
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

export const Head = ({ data }) => <Seo title={data.markdownRemark.frontmatter.title} />

export default MarkdownPage
