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
import "../styles/globals.css"
import "./layout.css"

const Layout = ({ type = 'light', children, subHeaderTitle, subHeaderDescription, subHeaderBgImage, subHeaderChildren }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

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
    >
      <Header
        type={type} siteTitle={data.site.siteMetadata?.title || `Title`}
        bgImage={subHeaderBgImage}
        subHeader={!isHome && subHeaderTitle && (
          <SubHeader
            title={subHeaderTitle}
            description={subHeaderDescription}
            bgImage={subHeaderBgImage}
          >
            {subHeaderChildren}
          </SubHeader>
        )}
      />

      <main id="gatsby-focus-wrapper" style={{ flex: 1, overflowX: "hidden", width: "100vw" }}>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
