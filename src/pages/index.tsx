import { Link } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ul>
      <li>
        <Link to="/docs/get-started">Docs</Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
