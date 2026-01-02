/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require('react')
const { siteMetadata } = require('./gatsby-config')

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })

  const baseUrl = (siteMetadata && siteMetadata.siteUrl) || ''
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const ogImageUrl = `${normalizedBase}images/og-image.png`

  setHeadComponents([
    // Open Graph
    React.createElement('meta', { key: 'og-image', property: 'og:image', content: ogImageUrl }),
    React.createElement('meta', { key: 'og-image-type', property: 'og:image:type', content: 'image/png' }),
    // Twitter
    React.createElement('meta', { key: 'twitter-card', name: 'twitter:card', content: 'summary_large_image' }),
    React.createElement('meta', { key: 'twitter-image', name: 'twitter:image', content: ogImageUrl }),
    // Generic
    React.createElement('meta', { key: 'image', name: 'image', content: ogImageUrl }),
  ])
}
