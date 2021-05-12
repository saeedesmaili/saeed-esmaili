import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../components/signup.css"

const browser = typeof window !== "undefined" && window

const ContactMePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    browser && (
      <Layout location={location} title={siteTitle} langKey="en">
        <Seo title="Contact Saeed Esmaili" />
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSf7kXvu30rPNVegbeZNHbdwHtAAreOwUQRlO9tPLQCT-gosvw/viewform?embedded=true"
          width="640"
          height="900"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Loading…
        </iframe>
      </Layout>
    )
  )
}

export default ContactMePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
