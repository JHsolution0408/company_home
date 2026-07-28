/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require("react")

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  // Set document language; page-level meta tags are handled in src/components/seo.js
  setHtmlAttributes({ lang: `ko` })

  // 개발 배포(dev.jh-solution.net)는 검색엔진에 노출되지 않도록 noindex 처리
  // https://developers.google.com/search/docs/crawling-indexing/block-indexing
  if (process.env.GATSBY_NOINDEX === `true`) {
    setHeadComponents([
      React.createElement("meta", {
        key: "robots",
        name: "robots",
        content: "noindex, nofollow",
      }),
    ])
  }
}
