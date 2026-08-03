/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require("react")
const { isProd, prodUrl } = require("./site-env")
const { siteMetadata } = require("./gatsby-config")
const { NAV_LINKS } = require("./src/data/nav")

// 한글 상호("제이에이치솔루션") 검색에 잡히도록 회사 정보를 구조화 데이터로 제공한다
// https://developers.google.com/search/docs/appearance/structured-data/organization
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "㈜제이에이치솔루션",
  alternateName: siteMetadata.alternateName,
  url: prodUrl,
  logo: `${prodUrl}/images/og-image.png`,
  telephone: "+82-2-6404-1607",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressRegion: "서울특별시",
    addressLocality: "금천구",
    streetAddress: "가산디지털2로 135, 1동 1701-1703호(가산동, 가산어반워크)",
    postalCode: "08504",
  },
}

// 사이트링크(검색결과 하위 링크) 후보를 검색엔진에 알린다. 노출 여부는 구글이 결정한다.
// https://developers.google.com/search/docs/appearance/sitelinks
const SITE_NAVIGATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: NAV_LINKS.map((link, index) => ({
    "@type": "SiteNavigationElement",
    position: index + 1,
    name: link.name,
    url: `${prodUrl}${link.path}`,
  })),
}

// 네이버 서치어드바이저 사이트 소유확인 코드 (운영/개발 사이트가 별도 등록되어 있음)
const NAVER_SITE_VERIFICATION = isProd
  ? `c2a395993442831aa17d17a5514d87f11efb45b9`
  : `7ce7f4899c6784a48e3158f842c855baeb8eb2ff`

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  // Set document language; page-level meta tags are handled in src/components/seo.js
  setHtmlAttributes({ lang: `ko` })

  const meta = (name, content) =>
    React.createElement("meta", { key: name, name, content })

  // 개발 배포(dev.jh-solution.net)는 검색엔진에 노출되지 않도록 noindex 처리
  // https://developers.google.com/search/docs/crawling-indexing/block-indexing
  setHeadComponents([
    meta("naver-site-verification", NAVER_SITE_VERIFICATION),
    ...(isProd ? [] : [meta("robots", "noindex, nofollow")]),
    React.createElement("script", {
      key: "organization-json-ld",
      type: "application/ld+json",
      dangerouslySetInnerHTML: {
        __html: JSON.stringify(ORGANIZATION_JSON_LD),
      },
    }),
    React.createElement("script", {
      key: "site-navigation-json-ld",
      type: "application/ld+json",
      dangerouslySetInnerHTML: {
        __html: JSON.stringify(SITE_NAVIGATION_JSON_LD),
      },
    }),
  ])
}
