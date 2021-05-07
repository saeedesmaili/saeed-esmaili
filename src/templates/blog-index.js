import * as React from "react"
import { Link, graphql } from "gatsby"
import get from 'lodash/get';

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const locales = require('../utils/locales')


class BlogIndexTemplate extends React.Component {
  render() {
    const langKey = this.props.pageContext.langKey;
    console.log(this.props)

    if (langKey == 'fa') {
      import('../fonts/fonts-post.fa.css')
    }

    const posts = get(this, 'props.data.allMarkdownRemark.nodes');
    return (
      <Layout location={this.props.location} title={locales[langKey].siteTitle}>
       <Seo 
        title={locales[langKey].homeTitle}
        description={locales[langKey].description}
        lang={langKey} 
       />
       <Bio 
        blogAuthor={locales[langKey].blogAuthor}
        writtenBy={locales[langKey].writtenBy}
       />
       <ol style={{ listStyle: `none` }}>
         {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
    )
  }
}


export default BlogIndexTemplate

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
