import * as React from "react"
import { graphql, Link } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "./project-detail.module.css"
import ProjectTag from "../components/template/ProjectTag"
import PagerLink from "../components/template/PagerLink"

const Section = ({ title, items }) => {
  if (!items) {
    return null
  }

  if (!Array.isArray(items)) {
    return (
      <div className={styles.sectionRow}>
        <div className={styles.sectionLeft}>
          <h3 className={styles.sectionTitle}>{title}</h3>
        </div>
        <div className={styles.sectionRight}>
          <div className={styles.sectionContent}>
            {items}
          </div>
        </div>
      </div>
    )

  }

  // Parse bilingual title pattern: "KO (EN)"; fall back to the whole string
  let koTitle = title
  const m = /^\s*(.*?)\s*\((.*?)\)\s*$/.exec(title || "")
  if (m) {
    koTitle = m[1]
  }

  return (
    <div className={styles.sectionRow}>
      <div className={styles.sectionLeft}>
        <h3 className={styles.sectionTitle}>{koTitle}</h3>
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

// Project 상세 페이지용 이전/다음 네비게이션 계산 함수
const getPrevNextProject = (list, currentId) => {
  if (!Array.isArray(list) || list.length === 0) {
    return { prev: null, next: null }
  }

  const idx = list.findIndex(v => v.id === currentId)
  if (idx === -1) {
    return { prev: null, next: null }
  }

  const nextNode = idx > 0 ? list[idx - 1] : null
  const prevNode = idx < list.length - 1 ? list[idx + 1] : null

  return {
    prev: prevNode?.frontmatter ?? null,
    next: nextNode?.frontmatter ?? null,
  }
}


const ProjectDetailPage = ({ data, pageContext }) => {
  const node = data.markdownRemark;

  const { title, description, date, period, featureImage, tags, client, contents, type } = node.frontmatter

  const sortedProjectList = [...pageContext.list].sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  }).filter(v => v.frontmatter.type === type);

  const { prev, next } = getPrevNextProject(sortedProjectList, node.id);

  return (
    <Layout
      type="light"
      subHeaderTitle="프로젝트"
      subHeaderDescription={description || "JH솔루션의 기술이 실현된 혁신의 현장, 데이터로 검증된 다양한 사업 분야의 수행 실적을 소개합니다."}
      subHeaderBgImage="/images/banners/bg_project.png"
    >
      <div className={styles.container}>
        <section>
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
              <Section title="사업명" items={title}  />
              <Section title="사업기간" items={period} />
              <Section title="발주처/지원기관" items={client} />
              <Section title="사업내용" items={contents} />
            </div>
          </div>

          <nav className={styles.pager}>
            <div className={styles.pagerBtnBox}>
              <PagerLink
                to={`/projects/${prev?.slug}/`}
                disabled={!prev}
              >
                이전
              </PagerLink>

              <PagerLink
                to={`/projects/${next?.slug}/`}
                align="right"
                disabled={!next} 
              >
                다음
              </PagerLink>
            </div>
            <Link className={styles.listBtnBox} to={`/projects`} target="_self">목록</Link>
          </nav>
        </section>
      </div>
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
        period
        description
        featureImage
        tags
        client
        contents
        slug
        type
      }
    }
  }
`

export const Head = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Seo 
      title={frontmatter.title}
      description={frontmatter.description}
    />
  )
}

export default ProjectDetailPage
