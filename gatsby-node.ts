import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import { resolve } from "path"

const pageTemplate = resolve("src/templates/Page/index.tsx")

interface Edge {
  next: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
    id: string
  }
  node: {
    fields: {
      slug: string
    }
    id: string
  }
  previous: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
    id: string
  }
}

interface Data {
  allMarkdownRemark: {
    edges: Edge[]
  }
}

const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
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
    reporter.panicOnBuild("There was an error loading your blog posts", errors)

    return
  }

  const {
    allMarkdownRemark: { edges },
  } = data as Data

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

export { createPages, onCreateNode }
