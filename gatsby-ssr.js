/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require("react")
const { isProd } = require("./site-env")

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

  const head = [
    React.createElement("meta", {
      key: "naver-site-verification",
      name: "naver-site-verification",
      content: NAVER_SITE_VERIFICATION,
    }),
  ]

  // 개발 배포(dev.jh-solution.net)는 검색엔진에 노출되지 않도록 noindex 처리
  // https://developers.google.com/search/docs/crawling-indexing/block-indexing
  if (!isProd) {
    head.push(
      React.createElement("meta", {
        key: "robots",
        name: "robots",
        content: "noindex, nofollow",
      })
    )
  }

  setHeadComponents(head)
}
