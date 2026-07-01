import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"

import Seo from "../components/seo"
import Layout from "../components/layout"
import ProjectTag from "../components/template/ProjectTag"
import PagerLink from "../components/template/PagerLink"
import DownloadIcon from "../../static/icons/common/download-icon-light.svg"
import { apiAssetUrl, apiRequest, formatNoticeDate } from "../utils/api"
import * as listStyles from "./projects.module.css"
import * as detailStyles from "../templates/project-detail.module.css"

const PAGE_TITLE = "프로젝트"
const PAGE_DESCRIPTION =
  "JH SOLUTION의 기술이 구현된 혁신의 현장과 다양한 사업 분야의 수행 실적을 소개합니다."

const Section = ({ title, items }) => {
  if (!items || (Array.isArray(items) && items.length === 0)) return null
  return (
    <div className={detailStyles.sectionRow}>
      <div className={detailStyles.sectionLeft}>
        <h3 className={detailStyles.sectionTitle}>{title}</h3>
      </div>
      <div className={detailStyles.sectionRight}>
        {Array.isArray(items) ? (
          <ul className={detailStyles.sectionList}>
            {items.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        ) : (
          <div className={detailStyles.sectionContent}>{items}</div>
        )}
      </div>
    </div>
  )
}

const ProjectList = () => {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    let active = true
    apiRequest("/api/content/project")
      .then(data => active && setItems(data.contents))
      .catch(requestError => active && setError(requestError.message))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <div id="content" className={listStyles.projectContainer}>
      <h1 className={listStyles.projectTitle}>
        산업과 도시의 내일을 바꾸는&nbsp;
        <br className={listStyles.brForMobile} />
        <span>JH SOLUTION의 핵심 프로젝트</span>
      </h1>
      <h2>제조 산업 현장부터 스마트시티, 국가 연구 과제까지 주요 수행 레퍼런스입니다.</h2>
      <div className={listStyles.projectList}>
        {loading && <p className={listStyles.status}>프로젝트를 불러오는 중입니다.</p>}
        {error && <p className={listStyles.error}>{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className={listStyles.status}>등록된 프로젝트가 없습니다.</p>
        )}
        {items.map(project => (
          <Link key={project.id} to={`/projects/${project.slug}`} className={listStyles.projectLink}>
            <div className={listStyles.project}>
              <img
                src={apiAssetUrl(project.featureImageUrl) || "/images/none_feature.png"}
                alt={project.title}
                className={listStyles.projectThumbnail}
              />
              <div className={listStyles.projectDetail}>
                <div>
                  <h3>{project.title}</h3>
                  {project.projectTags?.length > 0 && (
                    <div className={listStyles.tags}>
                      {project.projectTags.map(tag => <ProjectTag tag={tag} key={tag} />)}
                    </div>
                  )}
                </div>
                <div className={listStyles.projectDate}>
                  {formatNoticeDate(project.publishedAt)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const ProjectDetail = ({ slug }) => {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    let active = true
    apiRequest(`/api/content/project/${encodeURIComponent(slug)}`)
      .then(response => active && setData(response))
      .catch(requestError => active && setError(requestError.message))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [slug])

  if (loading) return <div className={detailStyles.container}>프로젝트를 불러오는 중입니다.</div>
  if (error || !data?.content) {
    return <div className={detailStyles.container}><p>{error || "프로젝트를 찾을 수 없습니다."}</p></div>
  }

  const { content, prev, next } = data
  return (
    <div className={detailStyles.container}>
      <section>
        <div className={detailStyles.projectHeader}>
          <h1 className={detailStyles.title}>{content.title}</h1>
          {content.projectTags?.length > 0 && (
            <div className={detailStyles.tags}>
              {content.projectTags.map(tag => <ProjectTag tag={tag} key={tag} />)}
            </div>
          )}
          <p className={detailStyles.date}>{formatNoticeDate(content.publishedAt)}</p>
        </div>
        <div className={detailStyles.contentRow}>
          {content.featureImageUrl && (
            <div className={detailStyles.imageBox}>
              <img src={apiAssetUrl(content.featureImageUrl)} alt={content.title} className={detailStyles.image} />
            </div>
          )}
          <div className={detailStyles.detailBox}>
            <Section title="사업명" items={content.title} />
            <Section title="사업기간" items={content.projectPeriod} />
            <Section title="발주처 / 지원기관" items={content.projectClient} />
            <Section title="사업내용" items={content.projectContents} />
            {content.pdfUrl && (
              <Section title="다운로드" items={
                <a href={apiAssetUrl(content.pdfUrl)} download={content.pdfDownloadName || true} className={detailStyles.downloadWrap}>
                  <span>{content.pdfLabel || "다운로드"}</span>
                  <span className={detailStyles.pdfButtonIcon}><img width={20} height={20} src={DownloadIcon} alt="" /></span>
                </a>
              } />
            )}
          </div>
        </div>
        <nav className={detailStyles.pager}>
          <div className={detailStyles.pagerBtnBox}>
            <PagerLink to={`/projects/${prev?.slug || ""}`} disabled={!prev}>이전</PagerLink>
            <PagerLink to={`/projects/${next?.slug || ""}`} align="right" disabled={!next}>다음</PagerLink>
          </div>
          <Link className={detailStyles.listBtnBox} to="/projects">목록</Link>
        </nav>
      </section>
    </div>
  )
}

const ProjectsPage = () => {
  const { pathname } = useLocation()
  const slug = decodeURIComponent(pathname.replace(/^\/projects\/?/, "").replace(/\/$/, ""))
  return (
    <Layout type="light" subHeaderTitle={PAGE_TITLE} subHeaderDescription={PAGE_DESCRIPTION} subHeaderBgImage="/images/banners/bg_project.png">
      {slug ? <ProjectDetail slug={slug} /> : <ProjectList />}
    </Layout>
  )
}

export const Head = () => <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
export default ProjectsPage
