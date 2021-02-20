const { resolve, join } = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const pageTemplate = resolve("./src/templates/Page/index.tsx")

async function createPages({ graphql, actions, reporter }) {
  const { createPage } = actions

  const { data, errors } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
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
      node: { fields, id },
    } = edge

    createPage({
      component: pageTemplate,
      context: {
        id,
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
