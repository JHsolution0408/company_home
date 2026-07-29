/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

function Seo({ description, title, children, image }) {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            prodUrl
          }
        }
      }
    `
  )

  const siteName = site.siteMetadata?.title
  const siteUrl = site.siteMetadata?.siteUrl?.replace(/\/$/, "") || ""
  // 개발 배포도 canonical / og:url 은 운영 주소로 내보내 대표 URL 이 dev 로 잡히지 않게 한다
  const canonicalHost =
    site.siteMetadata?.prodUrl?.replace(/\/$/, "") || siteUrl

  const metaDescription = description || site.siteMetadata.description
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const ogUrl = `${canonicalHost}${pathname || ""}`

  // Absolute image URL (prefer explicit image, fallback to default)
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}/images/og-image.png`

  return (
    <>
      <title>{fullTitle}</title>
      <link rel="canonical" href={ogUrl} />
      {/* Open Graph */}
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ko_KR" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo
