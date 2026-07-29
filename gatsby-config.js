/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

const { isProd, siteUrl } = require(`./site-env`)

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `JHSOLUTION`,
    description: `㈜제이에이치솔루션(JH솔루션, JHSOLUTION)은 데이터와 물리 법칙을 융합한 독자적인 기술로 산업의 난제를 해결합니다. 에너지 최적화를 넘어, 인류와 환경이 공존하는 탄소 중립 사회의 기술적 표준이 되겠습니다.`,
    author: `JH`,
    image: `/images/og-image.png`,
    // canonical / og:url / sitemap 의 기준 주소. GATSBY_DEPLOY_ENV 에 따라 운영/개발 주소가 결정된다.
    siteUrl,
    // 사명 표기 변형. Organization 구조화 데이터(gatsby-ssr.js)에서 읽어 쓴다.
    alternateName: [
      `제이에이치솔루션`,
      `제이에이치 솔루션`,
      `JH솔루션`,
      `JHSOLUTION`,
      `JH Solution`,
    ],
  },
  plugins: [
    {
      // 관리자 페이지는 noindex 이므로 사이트맵에서도 제외한다
      resolve: `gatsby-plugin-sitemap`,
      options: { excludes: [`/admin/*`] },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap-index.xml`, // gatsby-plugin-sitemap v5+ 기준
        policy: isProd
          ? [
              {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/404'], // 검색 노출을 원치 않는 경로
              },
            ]
          : [
              {
                userAgent: '*',
                disallow: '/', // 개발/스테이징 서버는 검색 노출 차단
              },
            ],
      },
    },
    `gatsby-plugin-svgr`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-96x96.png`,
      },
    },
  ],
}
