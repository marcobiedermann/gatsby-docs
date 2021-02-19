import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import Header from "../Header"

const Layout = ({ children }) => {
  const {
    allMarkdownRemark: { edges },
    site,
  } = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
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
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header>
        <h1>
          <Link to="/">{site.siteMetadata?.title || "Title"}</Link>
        </h1>
      </Header>
      <main>{children}</main>
      <aside>
        <nav>
          <ul>
            {edges.map(edge => {
              const {
                node: {
                  fields: { slug },
                  frontmatter: { title },
                  id,
                },
              } = edge

              return (
                <li key={id}>
                  <Link to={`/docs${slug}`}>{title}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <footer>
        <p>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </p>
      </footer>
    </>
  )
}

export default Layout
