import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "../pages/company/vision-mission.module.css"

// 보도자료 상세 템플릿
const PressDetailBody = ({ html }) => {
  if (!html) {
    return <p style={{ color: "#c00" }}>콘텐츠를 불러오는 중 문제가 발생했습니다.</p>
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

const PressDetailPage = ({ data }) => {
  const node = data.markdownRemark
  const { title, description, date, featureImage } = node.frontmatter

  return (
    <Layout
      type="dark"
      subHeaderTitle="보도자료"
      subHeaderDescription={description || "JH솔루션의 혁신과 성과를 언론을 통해 전해드립니다"}
      subHeaderBgImage="/images/banners/bg_press_detail.png"
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
              margin: "0 auto 24px",
              width: "100%",
              maxWidth: "720px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "16px",
            }}
          />
        )}

        <PressDetailBody
          html={node.html.replace(/<img([^>]*)>/g, '<img$1 style="border-radius:16px;">')}
        />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query PressDetail($id: String!) {
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

export default PressDetailPage
