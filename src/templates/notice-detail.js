import * as React from "react";
import { graphql, Link } from "gatsby";

import Seo from "../components/seo";
import Layout from "../components/layout";
import * as styles from "./notice-detail.module.css";
import PagerLink from "../components/template/PagerLink";

const PAGE_TITLE = "공지사항";
const PAGE_DESCRIPTION = "제이에이치솔루션의 주요 소식과 최신 정보를 전해드립니다.";

// 보도자료 상세 템플릿
const NoticeDetailBody = ({ html }) => {
  if (!html) {
    return <p style={{ color: "#c00" }}>콘텐츠를 불러오는 중 문제가 발생했습니다.</p>
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

// Notice 상세 페이지용 이전/다음 네비게이션 계산 함수
const getPrevNextNotice = (list, currentId) => {
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

const NoticeDetailPage = ({ data, pageContext }) => {
  const node = data.markdownRemark;
  const { title, date, type, featureImage } = node.frontmatter;
  
  const sortedNoticeList = [...pageContext.list].sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  }).filter(v => v.frontmatter.type === type);

  const { prev, next } = getPrevNextNotice(sortedNoticeList, node.id);

  return (
    <Layout
      type="light"
      subHeaderTitle={PAGE_TITLE}
      subHeaderDescription={PAGE_DESCRIPTION}
      subHeaderBgImage="/images/banners/bg_notice.png"
    >
      <div className={styles.container}>
        <section>
          <div className={styles.noticeHeader}>
            <h1 className={styles.title}>
              {title}
            </h1>
            {date && (
              <p className={styles.date}>
                {date}
              </p>
            )}
          </div>

          <div className={styles.noticeContainer}>
            {featureImage && (
              <img
                src={featureImage}
                alt={title}
              />
            )}
            <div className={styles.detailBodyWrap}>
              <NoticeDetailBody
                html={node.html.replace(/<img([^>]*)>/g, '<img$1 style="border-radius:16px;">')}
              />
            </div>
          </div>

          <nav className={styles.pager}>
            <div className={styles.pagerBtnBox}>
              <PagerLink
                to={`/notice/${prev?.slug}/`}
                disabled={!prev}
              >
                이전
              </PagerLink>

              <PagerLink
                to={`/notice/${next?.slug}/`}
                align="right"
                disabled={!next} 
              >
                다음
              </PagerLink>
            </div>
            <Link className={styles.listBtnBox} to={`/notice`} target="_self">목록</Link>
          </nav>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query NoticeDetail($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date
        summary
        featureImage
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

export default NoticeDetailPage;