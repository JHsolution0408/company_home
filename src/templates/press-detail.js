import * as React from "react"
import { graphql, Link } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "./press-detail.module.css"
import PagerLink from "../components/template/PagerLink"

// 보도자료 상세 템플릿
const PressDetailBody = ({ html }) => {
  if (!html) {
    return <p style={{ color: "#c00" }}>콘텐츠를 불러오는 중 문제가 발생했습니다.</p>
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

// Press 상세 페이지용 이전/다음 네비게이션 계산 함수
const getPrevNextPress = (list, currentId) => {
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

const PressDetailPage = ({ data, pageContext }) => {
  const node = data.markdownRemark;
  const { title, description, date, featureImage, type } = node.frontmatter;

  const sortedPressList = [...pageContext.list].sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  }).filter(v => v.frontmatter.type === type);

  const { prev, next } = getPrevNextPress(sortedPressList, node.id);

  return (
    <Layout
      type="dark"
      subHeaderTitle="보도자료"
      subHeaderDescription={description || "저희 회사의 최신 뉴스, 보도자료, 그리고 미디어 자료들입니다."}
      subHeaderBgImage="/images/banners/bg_press_detail.png"
    >
      <div className={styles.container}>
        <section>
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

          <nav className={styles.pager}>
            <div className={styles.pagerBtnBox}>
              <PagerLink
                to={`/press/${prev?.slug}/`}
                disabled={!prev}
              >
                이전
              </PagerLink>

              <PagerLink
                to={`/press/${next?.slug}/`}
                align="right"
                disabled={!next} 
              >
                다음
              </PagerLink>
            </div>
            <Link className={styles.listBtnBox} to={`/press`} target="_self">목록</Link>
          </nav>
        </section>
      </div>
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
        type
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
)

export default PressDetailPage
