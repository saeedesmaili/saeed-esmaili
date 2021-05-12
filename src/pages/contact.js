import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const browser = typeof window !== "undefined" && window

const ContactMePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    browser && (
      <Layout location={location} title={siteTitle} langKey="en">
        <Seo title="Contact Saeed Esmaili" />
        <h1>Contact Saeed Esmaili</h1>
        <p>You can contact with me with the following form.</p>
        <form
          name="Contact Form - en"
          method="POST"
          data-netlify="true"
          action="/thank-you"
        >
          <input type="hidden" name="form-name" value="Contact Form - en" />
          <div>
            <label>Your Email:</label>
            <input type="email" name="email" />
          </div>
          <div>
            <label>Message:</label>
            <textarea name="message" />
          </div>
          <button type="submit">Send</button>
        </form>
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
