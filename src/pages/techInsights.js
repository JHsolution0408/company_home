import * as React from "react"
import * as styles from "./techInsights.module.css"

import Layout from "../components/layout"
import { graphql, Link, useStaticQuery } from "gatsby"
import DownloadIcon from '../../static/icons/common/download-icon-light.svg';

const TechInsights = () => {
  const data = useStaticQuery(graphql`
    query InsightsListQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/techInsights/.*.md$/" } }
        sort: { frontmatter: { order: DESC } }
      ) {
        nodes {
          id
          frontmatter {
            order
            title
            date
            featureImage
            author
            slug
            type
          }
        }
      }
    }
  `);
  
  const insights = data.allMarkdownRemark.nodes;

  // PDF 열기 함수 3Line 영역 링크 or 파일링크 추가
  const handleOpenPdf = (url) => {
    if (!url) return
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <Layout
      type="dark"
      subHeaderTitle="기술 인사이트"
      subHeaderDescription="지속가능한 미래를 위한 JH Solution의 핵심 기술과 깊이 있는 연구 분석 자료를 확인하실 수 있습니다."
      subHeaderBgImage="/images/banners/bg_techInsights.png"
    >
      {/* 타이틀 영역 */}
      <div className={styles.container}>
        <div className={styles.titleWrap}>
          <div className={styles.titleBox}>
            <div className={styles.mainTitle}>
              <h1 className={styles.firstTitle}>
                현장 적용 기술부터 미래 R&D 과제까지,&nbsp;
                <br className={styles.brForMobile} />
                <span className={styles.secondTitle}>
                  기술의 모든 것
                </span>
              </h1>
            </div>
          </div>
          <div className={styles.titleBox}>
            <h3 className={styles.subTitle}>
              지속가능한 미래를 위한 JH Solution의 핵심 기술과 깊이 있는 연구 분석 자료를 확인하실 수 있습니다.
            </h3>
          </div>
        </div>
        {/* Insight List 영역 */}
        <div className={styles.listWrap}>
          {insights.map(insight => (
            <div 
              key={insight.id} 
              className={styles.list}
            >
              <img 
                className={styles.insightImg} 
                src={insight.frontmatter.featureImage}
                alt="Insight Image"
              />
              <div className={styles.contentBox}>
                <div className={styles.titleWrap}>
                  <h3 className={styles.title}>
                    {insight.frontmatter.title}
                  </h3>
                </div>
                <div className={styles.postMeta}>
                  <span className={styles.author}>
                    {insight.frontmatter.author}
                  </span>
                  <span className={styles.rectangle} />
                  <span className={styles.date}>
                    {insight.frontmatter.date}
                  </span>
                </div>
              </div>
              <button 
                className={styles.downloadWrap}
                onClick={() => handleOpenPdf(insight.frontmatter.pdfUrl)}
              >
                <span>PDF</span>
                <span className={styles.pdfButtonIcon}>
                  <img
                    width={20}
                    height={20}
                    src={DownloadIcon}
                    alt={"PDF Download"}
                  />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default TechInsights;