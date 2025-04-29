import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const TestPage = () => (
  <Layout>
    <h1>Hi from the test page</h1>
    <p>Welcome to the test page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head = () => <Seo title="Test Page" />

export default TestPage