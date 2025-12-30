import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "./project-detail.module.css"
import ProjectTag from "../components/template/ProjectTag"

const Section = ({ title, items }) => {
  if (!Array.isArray(items) || items.length === 0) return null

  // Parse bilingual title pattern: "KO (EN)"; fall back to the whole string
  let koTitle = title
  let enSubtitle = ""
  const m = /^\s*(.*?)\s*\((.*?)\)\s*$/.exec(title || "")
  if (m) {
    koTitle = m[1]
    enSubtitle = m[2]
  }

  return (
    <div className={styles.sectionRow}>
      <div className={styles.sectionLeft}>
        <h3 className={styles.sectionTitle}>{koTitle}</h3>
        {enSubtitle && <div className={styles.sectionSubtitle}>{enSubtitle}</div>}
      </div>
      <div className={styles.sectionRight}>
        <ul className={styles.sectionList}>
          {items.map((it, idx) => (
            <li key={idx}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const ProjectDetailPage = ({ data }) => {
  const node = data.markdownRemark
  const { title, description, date, featureImage, tags, overview, scope, results } = node.frontmatter

  return (
    <Layout
      type="dark"
      subHeaderTitle="프로젝트"
      subHeaderDescription={description || "혁신적인 기술로 만들어가는 JH솔루션의 프로젝트"}
      subHeaderBgImage="/images/banners/bg_energy.png"
    >
      <section className={styles.container}>
        <div className={styles.projectHeader}>
          {/* 헤더 영역 */}
          <h1 className={styles.title}>{title}</h1>

          {Array.isArray(tags) && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag, idx) => (
                <ProjectTag
                  tag={tag}
                  key={idx}
                />
              ))}
            </div>
          )}

          {date && (
            <p className={styles.date}>
              {date}
            </p>
          )}
        </div>

        <hr />

        <div className={styles.contentRow}>
          {featureImage && (
            <div className={styles.imageBox}>
              <img
                src={featureImage}
                alt={title}
                className={styles.image}
              />
            </div>
          )}

          <div className={styles.detailBox}>
            {/* 구조화된 섹션: 개요 / 과제 & 범위 / 성과 */}
            <Section title="개요 (Challenge)" items={overview} />
            <Section title="과제 & 범위 (Project)" items={scope} />
            <Section title="성과 (Result)" items={results} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query ProjectDetail($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        date
        description
        featureImage
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
