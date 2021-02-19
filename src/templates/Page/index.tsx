import { graphql, PageProps } from "gatsby"
import React, { FC } from "react"
import Layout from "../../components/layout"

export interface DataType {
  markdownRemark: {
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
    }
  }
`

export default PostTemplate
