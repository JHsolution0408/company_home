
import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import SubPageHeader from "../components/subpage-header"
import Seo from "../components/seo"
import Footer from "../components/footer"

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
            date(formatString: "YYYY.MM.DD")
          }
        }
      }
    }
  `)

  const pressList = data.allMarkdownRemark.nodes

  return (
    <>
      <SubPageHeader />
      <div
        style={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          /* alignItems: 'center', */
          justifyContent: 'flex-start',
          margin: 0,
          padding: 0,
          paddingTop: '40px',
        }}
      >
        <div
          id="title"
          style={{
            width: '100%',
            maxWidth: '100%',
            padding: 'clamp(24px,4vw,60px) 5vw',
            boxSizing: 'border-box',
            margin: '0 auto',
            backgroundImage: "url('/images/bg_press.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        >
          <h1 style={{ margin: '0px auto', maxWidth: '90vw', color: 'rgb(253, 253, 253)', fontSize: '40px' }}>홍보센터</h1>
          <p style={{ margin: '0px auto', maxWidth: '90vw', color: 'rgb(253, 253, 253)', whiteSpace: 'nowrap', fontSize: '20px' }}>
            저희 회사의 최신 뉴스, 보도자료, 그리고 미디어 자료들입니다.
          </p>
        </div>
        <div id="content" style={{ width: '100vw', maxWidth: '90vw', margin: '0 auto' }}>
          <h1 style={{ margin: '40px auto 24px auto', maxWidth: '90vw', color: '#222', fontSize: '32px', fontWeight: 700 }}>
            지속적인 변화
          </h1>
          <p style={{ margin: '0px auto 32px auto', maxWidth: '90vw', color: '#444', fontSize: '18px', fontWeight: 400 }}>
            JH솔루션은 혁신과 소통을 통해 지속적으로 변화하며, 다양한 미디어와 보도자료를 통해 그 여정을 공유합니다.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            marginBottom: '60px'
          }}>
            {pressList.slice(0, 5).map(press => (
              <div key={press.id} style={{
                display: 'flex',
                flexDirection: 'row',
                width: 700,
                background: '#fff',
                overflow: 'hidden',
                minHeight: 180,
                borderTop: '1px solid #ccc',
                borderBottom: '1px solid #ccc',
                paddingTop: 10
              }}>
                <img
                  src={press.frontmatter.featureImage ? press.frontmatter.featureImage : '/images/none_feature.png'}
                  alt={press.frontmatter.title}
                  style={{ width: 240, height: 160, objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: 22 }}>{press.frontmatter.title}</h3>
                  <div style={{ fontSize: 16, marginBottom: 16 }}>{press.frontmatter.summary}</div>
                  <Link to={`/press/${press.frontmatter.slug}`} style={{ color: '#0066cc', fontWeight: 'bold', fontSize: 16 }}>
                    자세히 보기 →
                  </Link>
                </div>
                <div style={{ width: 100, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 10, color: '#888', fontSize: 14 }}>
                  {press.frontmatter.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const Head = () => <Seo title="홍보센터" />

export default PressPage
