/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"

const locales = require('../utils/locales')


const Bio = ({ blogAuthor, writtenBy, isRoot, langKey }) => {
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
          <Link to={isRoot ? "/fa/" : "/"}>{locales[langKey].otherBlog}</Link>{' '}&bull;{' '}
          <a href={`mailto:${social?.email || ``}`}>{locales[langKey].email}</a>{' '}&bull;{' '}
          <a href={`https://twitter.com/${social?.twitter || ``}`} target="_blank" rel="noopener noreferrer">{locales[langKey].twitter}</a>{' '}&bull;{' '}
          <a href={`https://github.com/${social?.github || ``}`} target="_blank" rel="noopener noreferrer">{locales[langKey].github}</a>{' '}&bull;{' '}
          <a href={`https://www.linkedin.com/in/${social?.linkedin || ``}`} target="_blank" rel="noopener noreferrer">{locales[langKey].linkedin}</a>
        </p>
      )}
    </div>
  )
}

Bio.propTypes = {
  blogAuthor: PropTypes.arrayOf(PropTypes.object),
  writtenBy: PropTypes.string,
  isRoot: PropTypes.bool,
  langKey: PropTypes.bool,
}

export default Bio
