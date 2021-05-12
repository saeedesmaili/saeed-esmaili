import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const browser = typeof window !== "undefined" && window

const ThankYouPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    browser && (
      <Layout location={location} title={siteTitle} langKey="en">
        <Seo title="Contact Saeed Esmaili" />
        <h1>Sent!</h1>
        <p>Thank you for your submission!</p>
      </Layout>
    )
  )
}

export default ThankYouPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
