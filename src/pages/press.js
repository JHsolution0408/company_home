import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import ReactMarkdown from "react-markdown"

import Seo from "../components/seo"
import Layout from "../components/layout"
import PagerLink from "../components/template/PagerLink"
import { apiAssetUrl, apiRequest, formatNoticeDate } from "../utils/api"
import * as listStyles from "./press.module.css"
import * as detailStyles from "../templates/press-detail.module.css"

const PAGE_TITLE = "보도자료"
const PAGE_DESCRIPTION =
  "JH SOLUTION의 혁신과 성과를 언론을 통해 전해드립니다."

const PressList = () => {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    let active = true
    apiRequest("/api/content/press")
      .then(data => active && setItems(data.contents))
      .catch(requestError => active && setError(requestError.message))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return (
    <div id="content" className={listStyles.container}>
      <h1 className={listStyles.title}>
        지속적인 변화의&nbsp;
        <br className={listStyles.brForMobile} />
        <span>소식</span>
      </h1>
      <h2 className={listStyles.description}>
        JH SOLUTION은 혁신과 소통을 통해 지속적으로 변화하며 다양한
        미디어의 보도자료를 통해 그 여정을 공유합니다.
      </h2>
      <div className={listStyles.pressList}>
        {loading && <p className={listStyles.status}>보도자료를 불러오는 중입니다.</p>}
        {error && <p className={listStyles.error}>{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className={listStyles.status}>등록된 보도자료가 없습니다.</p>
        )}
        {items.map(item => (
          <Link
            to={`/press/${item.slug}`}
            className={listStyles.pressLink}
            key={item.id}
          >
            <div className={listStyles.press}>
              <img
                src={apiAssetUrl(item.featureImageUrl) || "/images/none_feature.png"}
                alt={item.title}
                className={listStyles.pressThumbnail}
              />
              <div className={listStyles.pressDetail}>
                <h3>{item.title}</h3>
                <div className={listStyles.pressDate}>
                  {formatNoticeDate(item.publishedAt)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const PressDetail = ({ slug }) => {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    let active = true
    apiRequest(`/api/content/press/${encodeURIComponent(slug)}`)
      .then(response => active && setData(response))
      .catch(requestError => active && setError(requestError.message))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return <div className={detailStyles.container}>보도자료를 불러오는 중입니다.</div>
  }
  if (error || !data?.content) {
    return (
      <div className={detailStyles.container}>
        <p>{error || "보도자료를 찾을 수 없습니다."}</p>
        <Link className={detailStyles.listBtnBox} to="/press">
          목록
        </Link>
      </div>
    )
  }

  const { content, prev, next } = data
  return (
    <div className={detailStyles.container}>
      <section>
        <div className={detailStyles.pressHeader}>
          <h1 className={detailStyles.title}>{content.title}</h1>
          <p className={detailStyles.date}>
            {formatNoticeDate(content.publishedAt)}
          </p>
        </div>
        <div className={detailStyles.pressContainer}>
          {content.featureImageUrl && (
            <img src={apiAssetUrl(content.featureImageUrl)} alt={content.title} />
          )}
          <div className={detailStyles.detailBodyWrap}>
            <ReactMarkdown
              components={{
                img: props => <img {...props} src={apiAssetUrl(props.src)} />,
              }}
            >
              {content.content}
            </ReactMarkdown>
            {content.externalUrl && (
              <a href={content.externalUrl} target="_blank" rel="noopener noreferrer">
                기사 원문 보기
              </a>
            )}
          </div>
        </div>
        <nav className={detailStyles.pager}>
          <div className={detailStyles.pagerBtnBox}>
            <PagerLink to={`/press/${prev?.slug || ""}`} disabled={!prev}>
              이전
            </PagerLink>
            <PagerLink
              to={`/press/${next?.slug || ""}`}
              align="right"
              disabled={!next}
            >
              다음
            </PagerLink>
          </div>
          <Link className={detailStyles.listBtnBox} to="/press">
            목록
          </Link>
        </nav>
      </section>
    </div>
  )
}

const PressPage = () => {
  const { pathname } = useLocation()
  const slug = decodeURIComponent(
    pathname.replace(/^\/press\/?/, "").replace(/\/$/, "")
  )
  return (
    <Layout
      type="light"
      subHeaderTitle={PAGE_TITLE}
      subHeaderDescription={PAGE_DESCRIPTION}
      subHeaderBgImage={
        slug ? "/images/banners/bg_press_detail.png" : "/images/banners/bg_press.png"
      }
    >
      {slug ? <PressDetail slug={slug} /> : <PressList />}
    </Layout>
  )
}

export const Head = () => (
  <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
)

export default PressPage
