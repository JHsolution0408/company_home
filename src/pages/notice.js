import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import ReactMarkdown from "react-markdown"

import Seo from "../components/seo"
import Layout from "../components/layout"
import PagerLink from "../components/template/PagerLink"
import { apiAssetUrl, apiRequest, formatNoticeDate } from "../utils/api"
import * as listStyles from "./notice.module.css"
import * as detailStyles from "../templates/notice-detail.module.css"

const PAGE_TITLE = "공지사항"
const PAGE_DESCRIPTION =
  "제이에이치솔루션의 주요 소식과 최신 정보를 전해드립니다."

const NoticeList = () => {
  const [notices, setNotices] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    let active = true
    apiRequest("/api/notices")
      .then(data => {
        if (active) setNotices(data.notices)
      })
      .catch(requestError => {
        if (active) setError(requestError.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className={listStyles.container}>
      <div className={listStyles.titleWrap}>
        <div className={listStyles.titleBox}>
          <div className={listStyles.mainTitle}>
            <h1 className={listStyles.firstTitle}>
              제이에이치솔루션만의 특별한 이야기&nbsp;
              <br className={listStyles.brForMobile} />
              <span className={listStyles.secondTitle}>바로 확인</span>
            </h1>
          </div>
        </div>
        <div className={listStyles.titleBox}>
          <h3 className={listStyles.subTitle}>
            AI와 Engineering이 함께하는 제이에이치솔루션의 다양한 발전과
            성과를 공유합니다.
          </h3>
        </div>
      </div>

      <div className={listStyles.listWrap}>
        {loading && <p className={listStyles.status}>공지사항을 불러오는 중입니다.</p>}
        {error && <p className={listStyles.error}>{error}</p>}
        {!loading && !error && notices.length === 0 && (
          <p className={listStyles.status}>등록된 공지사항이 없습니다.</p>
        )}
        {notices.map(notice => (
          <Link
            to={`/notice/${notice.slug}`}
            key={notice.id}
            className={listStyles.noticeLink}
          >
            <div className={listStyles.noticeDetail}>
              <h3>{notice.title}</h3>
              <div className={listStyles.noticeDate}>
                {formatNoticeDate(notice.publishedAt)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const NoticeDetail = ({ slug }) => {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    let active = true
    apiRequest(`/api/notices/${encodeURIComponent(slug)}`)
      .then(response => {
        if (active) setData(response)
      })
      .catch(requestError => {
        if (active) setError(requestError.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return <div className={detailStyles.container}>공지사항을 불러오는 중입니다.</div>
  }
  if (error || !data?.notice) {
    return (
      <div className={detailStyles.container}>
        <p>{error || "공지사항을 찾을 수 없습니다."}</p>
        <Link className={detailStyles.listBtnBox} to="/notice">
          목록
        </Link>
      </div>
    )
  }

  const { notice, prev, next } = data
  return (
    <div className={detailStyles.container}>
      <section>
        <div className={detailStyles.noticeHeader}>
          <h1 className={detailStyles.title}>{notice.title}</h1>
          <p className={detailStyles.date}>
            {formatNoticeDate(notice.publishedAt)}
          </p>
        </div>

        <div className={detailStyles.noticeContainer}>
          {notice.featureImageUrl && (
            <img src={apiAssetUrl(notice.featureImageUrl)} alt={notice.title} />
          )}
          <div className={detailStyles.detailBodyWrap}>
            <ReactMarkdown
              components={{
                img: props => <img {...props} src={apiAssetUrl(props.src)} />,
              }}
            >
              {notice.content}
            </ReactMarkdown>
          </div>
        </div>

        <nav className={detailStyles.pager}>
          <div className={detailStyles.pagerBtnBox}>
            <PagerLink to={`/notice/${prev?.slug || ""}`} disabled={!prev}>
              이전
            </PagerLink>
            <PagerLink
              to={`/notice/${next?.slug || ""}`}
              align="right"
              disabled={!next}
            >
              다음
            </PagerLink>
          </div>
          <Link className={detailStyles.listBtnBox} to="/notice">
            목록
          </Link>
        </nav>
      </section>
    </div>
  )
}

const NoticePage = () => {
  const { pathname } = useLocation()
  const slug = decodeURIComponent(
    pathname.replace(/^\/notice\/?/, "").replace(/\/$/, "")
  )

  return (
    <Layout
      type="light"
      subHeaderTitle={PAGE_TITLE}
      subHeaderDescription={PAGE_DESCRIPTION}
      subHeaderBgImage="/images/banners/bg_notice.png"
    >
      {slug ? <NoticeDetail slug={slug} /> : <NoticeList />}
    </Layout>
  )
}

export const Head = () => (
  <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
)

export default NoticePage
