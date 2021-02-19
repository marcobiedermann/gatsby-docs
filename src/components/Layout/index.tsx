import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import Header from "../header"

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
      <Header siteTitle={site.siteMetadata?.title || `Title`} />
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
