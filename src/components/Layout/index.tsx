import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import Aside from "../Aside"
import Content from "../Content"
import Footer from "../Footer"
import Grid from "../Grid"
import Header from "../Header"
import Main from "../Main"
import Navigation from "../Navigation"
import * as styles from "./style.module.css"

const Layout = ({ children }) => {
  const {
    allMarkdownRemark: { edges },
    site: {
      buildTime,
      siteMetadata: { title },
    },
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
        buildTime
        siteMetadata {
          title
        }
      }
    }
  `)

  const routes = edges.map(edge => {
    const {
      node: {
        fields: { slug },
        frontmatter: { title },
        id,
      },
    } = edge

    return {
      id,
      path: `/docs${slug}`,
      title,
    }
  })

  return (
    <div className={styles.layout}>
      <Header>
        <Grid>
          <div>
            <Link to="/">{title || "Title"}</Link>
          </div>
        </Grid>
      </Header>
      <Grid>
        <Content>
          <Main>{children}</Main>
          <Aside direction="left">
            <Navigation routes={routes} />
          </Aside>
        </Content>
      </Grid>
      <Footer>
        <Grid>
          <p>
            © {new Date().getFullYear()},{" "}
            <time dateTime={buildTime}>Built</time> with{" "}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </p>
        </Grid>
      </Footer>
    </div>
  )
}

export default Layout
