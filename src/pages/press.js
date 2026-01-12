
import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "./press.module.css"

const PressPage = () => {
  const data = useStaticQuery(graphql`
    query PressListQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/press/.*.md$/" } }
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
  `)

  const pressList = data.allMarkdownRemark.nodes

  return (
    <Layout
      type={'light'}
      subHeaderTitle="보도자료"
      subHeaderDescription="저희 회사의 최신 뉴스, 보도자료, 그리고 미디어 자료들입니다."
      subHeaderBgImage="/images/banners/bg_press.png"
    >
      <div>
        <div id="content" className={styles.container}>
          <h1 className={styles.title}>
            지속적인 변화의&nbsp;
            <br className={styles.brForMobile} />
            <span>소식</span>
          </h1>
          <h2 className={styles.description}>
            JH솔루션은 혁신과 소통을 통해 지속적으로 변화하며, 다양한 미디어와 보도자료를 통해 그 여정을 공유합니다.
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {pressList.slice(0, 5).map(press => (
              <Link
                to={`/press/${press.frontmatter.slug}`}
                className={styles.pressLink}
                key={press.id}
              >
                <div
                  key={press.id}
                  className={styles.press}
                >
                  <img
                    src={
                      press.frontmatter.featureImage
                        ? press.frontmatter.featureImage
                        : '/images/none_feature.png'
                    }
                    alt={press.frontmatter.title}
                    className={styles.pressThumbnail}
                  />

                  <div className={styles.pressDetail}>
                    <h3>{press.frontmatter.title}</h3>

                    <div className={styles.pressDate}>
                      {press.frontmatter.date}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="홍보센터" />

export default PressPage
