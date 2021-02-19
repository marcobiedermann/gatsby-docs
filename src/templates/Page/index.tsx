import { graphql, PageProps } from "gatsby"
import React, { FC } from "react"
import { repository } from "../../../package.json"
import Layout from "../../components/Layout"

export interface DataType {
  markdownRemark: {
    fields: {
      path: string
    }
    frontmatter: {
      title: string
    }
    html: string
  }
}

interface PageContextType {
  id: string
}

const PostTemplate: FC<PageProps<DataType, PageContextType>> = props => {
  const {
    data: {
      markdownRemark: {
        fields: { path },
        frontmatter: { title },
        html,
      },
    },
  } = props

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
            href={`${repository.url}/tree/master/${path}`}
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
      fields {
        path
      }
      frontmatter {
        title
      }
      html
    }
  }
`

export default PostTemplate
