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
            type
            date
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
    projects: require.resolve("./src/templates/project-detail.js"),
    notice: require.resolve("./src/templates/notice-detail.js"),
    default: require.resolve("./src/templates/markdown-page.js"),
  }

  const nodes = result.data.allMarkdownRemark.nodes;

  nodes.forEach(node => {
    const dir = node.parent?.relativeDirectory || ""
    const top = (dir.split("/")[0] || "").toLowerCase()
    // 공지사항은 운영 DB/API에서 동적으로 제공한다.

    if (["notice", "press", "techinsights", "projects", "solutions"].includes(top))
      return
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
        list: nodes,
      },
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions
  if (["/notice/", "/press/", "/projects/"].includes(page.path)) {
    deletePage(page)
    createPage({
      ...page,
      matchPath: `${page.path}*`,
    })
  }
}
