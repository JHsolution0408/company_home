import * as React from "react";
import * as styles from "./notice.module.css";

import Seo from "../components/seo";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery } from "gatsby";

const PAGE_TITLE = "공지사항";
const PAGE_DESCRIPTION = "제이에이치솔루션의 주요 소식과 최신 정보를 전해드립니다.";

const Notice = () => {
  const data = useStaticQuery(graphql`
    query NoticeQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/notice/.*.md$/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          frontmatter {
            title
            summary
            featureImage
            slug
            date
          }
        }
      }
    }
  `);

  const notices = data.allMarkdownRemark.nodes;

  return (
    <Layout
      type="light"
      subHeaderTitle={PAGE_TITLE}
      subHeaderDescription={PAGE_DESCRIPTION}
      subHeaderBgImage="/images/banners/bg_notice.png"
    >
      {/* 타이틀 영역 */}
      <div className={styles.container}>
        <div className={styles.titleWrap}>
          <div className={styles.titleBox}>
            <div className={styles.mainTitle}>
              <h1 className={styles.firstTitle}>
                제이에이치솔루션만의 특별한 이야기&nbsp;
                <br className={styles.brForMobile} />
                <span className={styles.secondTitle}>
                  바로 확인
                </span>
              </h1>
            </div>
          </div>
          <div className={styles.titleBox}>
            <h3 className={styles.subTitle}>
              AI와 Engineering 함께하는 제이에이치솔루션의 다양한 도전과 성과를 공유합니다.
            </h3>
          </div>          
        </div>
        {/* 공지사항 리스트 영역 */}
        <div className={styles.listWrap}>
          {notices.map(notice => (
            <Link
              to={`/notice/${notice.frontmatter.slug}`}
              key={notice.id}
              className={styles.noticeLink}
            >
              <div className={styles.noticeDetail}>
                <h3>{notice.frontmatter.title}</h3>
                <div className={styles.noticeDate}>
                  {notice.frontmatter.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => {
  return (
    <Seo 
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
    />
  )
}

export default Notice;