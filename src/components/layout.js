/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import SubHeader from "./subheader"
import FloatTop from "./template/FloatTop"
import "../styles/globals.css"
import "./layout.css"

const Layout = ({ type = 'light', children, subHeaderTitle, subHeaderDescription, subHeaderBgImage, anymationBanner }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const rootRef = React.useRef(null)

  const isHome = typeof window !== 'undefined' && window.location && window.location.pathname === '/';

  return (
    <div
      id="__gatsby"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100vw",
        width: "100%",
        margin: "0 auto",
        overflowX: "hidden",
        boxSizing: "border-box"
      }}
      ref={rootRef}
    >
      <Header
        type={type} siteTitle={data.site.siteMetadata?.title || `Title`}
        bgImage={subHeaderBgImage}
        subHeader={!isHome && subHeaderTitle && (
          <SubHeader
            title={subHeaderTitle}
            description={subHeaderDescription}
            bgImage={subHeaderBgImage}
          />
        )}
      />
      {anymationBanner}

      <main id="gatsby-focus-wrapper" style={{ flex: 1, overflowX: "hidden", width: "100vw" }}>
        {children}
        <FloatTop layoutRootRef={rootRef} />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
