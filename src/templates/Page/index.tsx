import { graphql, PageProps } from "gatsby"
import { join } from "path"
import React, { FC } from "react"
import { repository } from "../../../package.json"
import Layout from "../../components/Layout"

export interface DataType {
  markdownRemark: {
    frontmatter: {
      title: string
    }
    html: string
    parent: {
      relativePath: string
      sourceInstanceName: string
    }
  }
}

interface PageContextType {
  id: string
}

const PostTemplate: FC<PageProps<DataType, PageContextType>> = props => {
  const {
    data: {
      markdownRemark: {
        frontmatter: { title },
        html,
        parent: { relativePath, sourceInstanceName },
      },
    },
  } = props

  const path = join(sourceInstanceName, relativePath)


  return (
    <Layout>
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </main>
      <footer>
        <p>
          <a
            href={`${repository.url}/blob/main/content/${path}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Edit this page
          </a>
        </p>
      </footer>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
      parent {
        ... on File {
          relativePath
          sourceInstanceName
        }
      }
    }
  }
`

export default PostTemplate
