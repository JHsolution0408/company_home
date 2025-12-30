/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          frontmatter {
            slug
          }
          parent {
            ... on File {
              relativeDirectory
              name
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error loading Markdown content`, result.errors)
    return
  }

  const templateMap = {
    press: require.resolve("./src/templates/press-detail.js"),
    project: require.resolve("./src/templates/project-detail.js"),
    default: require.resolve("./src/templates/markdown-page.js"),
  }

  result.data.allMarkdownRemark.nodes.forEach((node) => {
    const dir = node.parent?.relativeDirectory || ""
    const top = dir.split("/")[0] || ""
    const basePath = top ? `/${top}` : ""
    const slug = node.frontmatter.slug || node.parent?.name
    const path = `${basePath}/${slug}`

    const component = templateMap[top] || templateMap.default

    createPage({
      path,
      component,
      context: {
        id: node.id,
        section: top,
      },
    })
  })
}
