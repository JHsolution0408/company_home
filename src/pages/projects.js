import * as React from "react"
import { Link } from "gatsby"



import SubPageHeader from "../components/subpage-header"
import Seo from "../components/seo"
import Footer from "../components/footer"


import { graphql, useStaticQuery } from "gatsby"

const ProjectsPage = () => {
  const data = useStaticQuery(graphql`
    query ProjectListQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/project/.*.md$/" } }
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

  const projects = data.allMarkdownRemark.nodes

  return (
    <>
      <SubPageHeader />
      <div
        id="title"
        style={{
          width: '100%',
          maxWidth: '100vw',
          backgroundColor: 'black',
          backgroundImage: "linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%), url(/images/bg_project.png)",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          marginBottom: '25px',
          padding: '40px 20px 60px 50px'
        }}
      >
        <div id="title-text" style={{ width: '90vw', maxWidth: '90vw', margin: '0 auto', textAlign: 'left' }}>
          <h1 style={{ margin: '0px auto', maxWidth: '90vw', color: 'rgb(253, 253, 253)', fontSize: '40px' }}>프로젝트</h1>
          <p style={{ margin: '0px auto', maxWidth: '90vw', color: 'rgb(253, 253, 253)', whiteSpace: 'nowrap', fontSize: '20px' }}>
            JH솔루션의 기술이 실현된 혁신의 현장, 데이터로 검증된 다양한 사업 분야의 수행 실적을 소개합니다.
          </p>
        </div>
      </div>

      <div id="content" style={{ width: '100vw', maxWidth: '90vw', margin: '0 auto' }}>
        <h1 style={{ margin: '40px auto 24px auto', maxWidth: '90vw', color: '#222', fontSize: '32px', fontWeight: 700 }}>
          산업과 도시의 내일을 바꾸는
          <span style={{ color: '#177D3C' }}>JH솔루션의 핵심 프로젝트</span>
        </h1>
        <p style={{ margin: '0px auto 32px auto', maxWidth: '90vw', color: '#444', fontSize: '18px', fontWeight: 400 }}>
          제조 산업 현장부터 스마트 시티, 국가 연구 과제까지 에너지 최적화와 디지털 전환을 위한 주요 수행 레퍼런스입니다.
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          marginBottom: '60px'
        }}>
          {projects.slice(0, 5).map(project => (
            <div key={project.id} style={{
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
                src={project.frontmatter.featureImage ? project.frontmatter.featureImage : '/images/none_feature.png'}
                alt={project.frontmatter.title}
                style={{ width: 240, height: 160, objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: 22 }}>{project.frontmatter.title}</h3>
                <div style={{ fontSize: 16, marginBottom: 16 }}>{project.frontmatter.summary}</div>
                <Link to={`/projects/${project.frontmatter.slug}`} style={{ color: '#0066cc', fontWeight: 'bold', fontSize: 16 }}>
                  자세히 보기 →
                </Link>
              </div>
              <div style={{ width: 100, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 10, color: '#888', fontSize: 14 }}>
                {project.frontmatter.date}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export const Head = () => <Seo title="프로젝트" />

export default ProjectsPage
