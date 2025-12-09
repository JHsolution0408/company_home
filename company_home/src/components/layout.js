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
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: "1900px", margin: "0 auto", overflowX: "hidden" }}
    >
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main style={{ flex: 1, overflowX: "hidden" }}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
