import * as React from "react"
import { Link } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "./projects.module.css"

import { graphql, useStaticQuery } from "gatsby"
import ProjectTag from "../components/template/ProjectTag"

const ProjectsPage = () => {
  const data = useStaticQuery(graphql`
    query ProjectListQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/.*.md$/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          frontmatter {
            title
            summary
            featureImage
            slug
            tags
            date(formatString: "YYYY.MM.DD")
          }
        }
      }
    }
  `)

  const projects = data.allMarkdownRemark.nodes

  return (
    <Layout
      type={'dark'}
      subHeaderTitle="프로젝트"
      subHeaderDescription="JH솔루션의 기술이 실현된 혁신의 현장, 데이터로 검증된 다양한 사업 분야의 수행 실적을 소개합니다."
      subHeaderBgImage="/images/banners/bg_project.png"
    >
      <div id="content" className={styles.projectContainer}>
        <h1 className={styles.projectTitle}>
          산업과 도시의 내일을 바꾸는&nbsp;
          <br className={styles.brForMobile} />
          <span>
            JH솔루션의 핵심 프로젝트
          </span>
        </h1>
        <h2>
          제조 산업 현장부터 스마트 시티, 국가 연구 과제까지 에너지 최적화와 디지털 전환을 위한 주요 수행 레퍼런스입니다.
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {projects.slice(0, 5).map(project => (
            <Link
              to={`/projects/${project.frontmatter.slug}`}
              className={styles.projectLink}
            >
              <div
                key={project.id}
                className={styles.project}
              >
                <img
                  src={project.frontmatter.featureImage ? project.frontmatter.featureImage : '/images/none_feature.png'}
                  alt={project.frontmatter.title}
                  className={styles.projectThumbnail}
                />

                <div className={styles.projectDetail}>
                  <div>
                    <h3>
                      {project.frontmatter.title}
                    </h3>

                    {Array.isArray(project.frontmatter.tags) && project.frontmatter.tags.length > 0 && (
                      <div className={styles.tags}>
                        {project.frontmatter.tags.map((tag, idx) => (
                          <ProjectTag
                            tag={tag}
                            key={tag}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.projectDate}>
                    {project.frontmatter.date}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="프로젝트" />

export default ProjectsPage
