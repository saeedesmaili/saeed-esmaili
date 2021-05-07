/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"


const Bio = ({ blogAuthor, writtenBy }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            linkedin
            email
            github
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = blogAuthor || data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  console.log(blogAuthor)

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Saeed Esmaili's profile picture"
      />
      {author?.name && (
        <p>
          {writtenBy} <strong>{author.name}</strong>{author?.summary || null}
          {` `}
          <br/>
          <a href={`mailto:${social?.email || ``}`}>email</a>{' '}&bull;{' '}
          <a href={`https://twitter.com/${social?.twitter || ``}`} target="_blank" rel="noopener noreferrer">twitter</a>{' '}&bull;{' '}
          <a href={`https://github.com/${social?.github || ``}`} target="_blank" rel="noopener noreferrer">github</a>{' '}&bull;{' '}
          <a href={`https://www.linkedin.com/in/${social?.linkedin || ``}`} target="_blank" rel="noopener noreferrer">linkedin</a>
        </p>
      )}
    </div>
  )
}

Bio.propTypes = {
  blogAuthor: PropTypes.arrayOf(PropTypes.object),
  writtenBy: PropTypes.string,
}

export default Bio
