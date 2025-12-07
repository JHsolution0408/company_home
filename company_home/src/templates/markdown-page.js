import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const MarkdownBody = ({ html }) => {
  if (!html) {
    return <p style={{ color: "#c00" }}>콘텐츠를 불러오는 중 문제가 발생했습니다.</p>
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

const MarkdownPage = ({ data }) => {
  const node = data.markdownRemark
  const { title, description } = node.frontmatter

  return (
    <Layout>
      <header style={{ backgroundColor: "#f9f9f9", borderBottom: "1px solid #e0e0e0", padding: "40px 20px" }}>
        <div style={{ maxWidth: "85%", margin: "0 auto", textAlign: "left" }}>
          <h1 style={{ color: "#003d99", marginBottom: "12px", fontSize: "32px" }}>{title}</h1>
          {description && (
            <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>{description}</p>
          )}
        </div>
      </header>

      <main style={{ padding: "60px 20px" }}>
        <div style={{ maxWidth: "85%", margin: "0 auto" }}>
          <MarkdownBody html={node.html} />
        </div>
      </main>
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
        description
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.markdownRemark.frontmatter.title} />

export default MarkdownPage
