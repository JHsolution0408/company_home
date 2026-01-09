import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "./press-detail.module.css"

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
      subHeaderDescription={description || "저희 회사의 최신 뉴스, 보도자료, 그리고 미디어 자료들입니다."}
      subHeaderBgImage="/images/banners/bg_press_detail.png"
    >
      <section className={styles.container}>
        <div className={styles.pressHeader}>
          <h1 className={styles.title}>
            {title}
          </h1>
          {date && (
            <p className={styles.date}>
              {date}
            </p>
          )}
        </div>

        <hr />

        <div className={styles.pressContainer}>
          {featureImage && (
            <img
              src={featureImage}
              alt={title}
            />
          )}
          <div className={styles.detailBodyWrap}>
            <PressDetailBody
              html={node.html.replace(/<img([^>]*)>/g, '<img$1 style="border-radius:16px;">')}
            />
          </div>
        </div>
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
