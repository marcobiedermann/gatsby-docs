const { createFilePath } = require("gatsby-source-filesystem")

const pageTemplate = require.resolve("./src/templates/Page/index.tsx")

async function createPages({ graphql, actions, reporter }) {
  const { createPage } = actions

  const { data, errors } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
            id
          }
          node {
            fields {
              slug
            }
            id
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
            id
          }
        }
      }
    }
  `)

  if (errors) {
    reporter.panicBuild("There was an error loading your blog posts", errors)

    return
  }

  const {
    allMarkdownRemark: { edges },
  } = data

  edges.forEach(edge => {
    const {
      next,
      node: { fields, id },
      previous,
    } = edge

    createPage({
      component: pageTemplate,
      context: {
        id,
        next,
        previous,
      },
      path: `/docs${fields.slug}`,
    })
  })
}

function onCreateNode({ node, actions, getNode }) {
  const { internal } = node

  if (internal.type === "MarkdownRemark") {
    const { createNodeField } = actions

    const slug = createFilePath({
      getNode,
      node,
      trailingSlash: false,
    })

    createNodeField({
      name: "slug",
      node,
      value: slug,
    })
  }
}

module.exports = {
  createPages,
  onCreateNode,
}
