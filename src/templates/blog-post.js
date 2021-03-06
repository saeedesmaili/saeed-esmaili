import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Signup from "../components/signup"
import { formatPostDate, formatReadingTime } from "../utils/helpers"
import Gitalk from "gatsby-plugin-gitalk"

import defaultOpenGraphImage from "../images/default.png"
import "@suziwen/gitalk/dist/gitalk.css"
import "../utils/gitalk-rtl.css"

const locales = require("../utils/locales")

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const langKey = post.fields.langKey
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const { coverImage } = post.frontmatter
  const coverImagePath =
    data.allImageSharp.nodes[0]?.fixed.src || defaultOpenGraphImage

  const translationPath =
    langKey === "en"
      ? `/fa${location.pathname}`
      : `${location.pathname.replace("fa/", "")}`
  const translationLink = (
    <span>
      {" "}
      • <Link to={translationPath}>{locales[langKey].translation}</Link>
    </span>
  )

  let gitalkConfig = {
    id: post.slug || post.id,
    title: post.frontmatter.title,
  }

  return (
    <Layout
      location={location}
      title={locales[langKey].siteTitle}
      langKey={langKey}
    >
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        lang={langKey}
        image={coverImagePath}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <small>
            {formatPostDate(post.frontmatter.date, langKey)}
            {` • ${formatReadingTime(post.timeToRead, langKey)}`}
            {post.frontmatter.translated ? translationLink : ""}
          </small>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio
            blogAuthor={locales[langKey].blogAuthor}
            writtenBy={locales[langKey].writtenBy}
            isRoot={langKey === "en" ? true : false}
            langKey={langKey}
          />
          <Signup langKey={langKey} />
        </footer>
      </article>
      <Gitalk options={gitalkConfig} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $originalImage: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        cover_image: coverImage
        translated
      }
      fields {
        slug
        langKey
      }
      timeToRead
    }
    allImageSharp(
      filter: { fixed: { originalName: { eq: $originalImage } } }
      limit: 1
    ) {
      nodes {
        fixed {
          src
          originalName
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
