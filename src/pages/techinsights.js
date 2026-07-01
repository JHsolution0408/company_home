import * as React from "react"

import Seo from "../components/seo"
import Layout from "../components/layout"
import DownloadIcon from "../../static/icons/common/download-icon-light.svg"
import { apiAssetUrl, apiRequest, formatNoticeDate } from "../utils/api"
import * as styles from "./techinsights.module.css"

const PAGE_TITLE = "기술 인사이트"
const PAGE_DESCRIPTION =
  "지속가능한 미래를 위한 JH SOLUTION의 핵심 기술과 깊이 있는 연구 분석 자료를 확인하실 수 있습니다."

const Techinsights = () => {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    let active = true
    apiRequest("/api/content/techinsight")
      .then(data => active && setItems(data.contents))
      .catch(requestError => active && setError(requestError.message))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const handleOpenPdf = url => {
    if (url) window.open(apiAssetUrl(url), "_blank", "noopener,noreferrer")
  }

  return (
    <Layout
      type="dark"
      subHeaderTitle={PAGE_TITLE}
      subHeaderDescription={PAGE_DESCRIPTION}
      subHeaderBgImage="/images/banners/bg_techinsights.png"
    >
      <div className={styles.container}>
        <div className={styles.titleWrap}>
          <div className={styles.titleBox}>
            <div className={styles.mainTitle}>
              <h1 className={styles.firstTitle}>
                현장 적용 기술부터 미래 R&amp;D 과제까지,&nbsp;
                <br className={styles.brForMobile} />
                <span className={styles.secondTitle}>기술의 모든 것</span>
              </h1>
            </div>
          </div>
          <div className={styles.titleBox}>
            <h3 className={styles.subTitle}>{PAGE_DESCRIPTION}</h3>
          </div>
        </div>
        <div className={styles.listWrap}>
          {loading && <p className={styles.status}>기술 인사이트를 불러오는 중입니다.</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className={styles.status}>등록된 기술 인사이트가 없습니다.</p>
          )}
          {items.map(item => (
            <div key={item.id} className={styles.list}>
              <img
                className={styles.insightImg}
                src={apiAssetUrl(item.featureImageUrl) || "/images/none_feature.png"}
                alt={item.title}
              />
              <div className={styles.contentBox}>
                <div className={styles.titleWrap}>
                  <h3 className={styles.title}>{item.title}</h3>
                </div>
                <div className={styles.postMeta}>
                  {item.author && <span>{item.author}</span>}
                  {item.author && <span className={styles.rectangle} />}
                  <span>{formatNoticeDate(item.publishedAt)}</span>
                </div>
              </div>
              <button
                type="button"
                className={styles.downloadWrap}
                onClick={() => handleOpenPdf(item.pdfUrl)}
              >
                <span>PDF</span>
                <span className={styles.pdfButtonIcon}>
                  <img width={20} height={20} src={DownloadIcon} alt="" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
)

export default Techinsights
