const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const locales = require('./src/components/locales')
const { supportedLanguages } = require('./i18n')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, deletePage } = actions

  Object.keys(supportedLanguages).forEach(langKey => {
    createPage({
      path: langKey === 'en' ? '/' : `/${langKey}/`,
      component: path.resolve('./src/templates/blog-index.js'),
      context: {
        langKey,
      },
    })
  })
  

  // return new Promise((resolve, reject) => {
  //   const blogPost = path.resolve('./src/templates/blog-post.js');

  //   let langKey = 'az'
  //   createPage({
  //     path: langKey,
  //     component: path.resolve('./src/templates/blog-index.js'),
  //     context: {
  //       langKey,
  //     },
  //   })


  //   // Create index pages for all supported languages
  //   Object.keys(supportedLanguages).forEach(langKey => {
  //     createPage({
  //       path: langKey === 'en' ? '/' : `/${langKey}/`,
  //       component: path.resolve('./src/templates/blog-index.js'),
  //       context: {
  //         langKey,
  //       },
  //     });
  //   });

  //   resolve(
  //     graphql(
  //       `
  //         {
  //           allMarkdownRemark(
  //             sort: { fields: [frontmatter___date], order: DESC }
  //             limit: 1000
  //           ) {
  //             edges {
  //               node {
  //                 fields {
  //                   slug
  //                   langKey
  //                   directoryName
  //                   maybeAbsoluteLinks
  //                 }
  //                 frontmatter {
  //                   title
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         console.log(result.errors);
  //         reject(result.errors);
  //         return;
  //       }

  //       // Create blog posts pages.
  //       const posts = result.data.allMarkdownRemark.edges;
  //       const allSlugs = _.reduce(
  //         posts,
  //         (result, post) => {
  //           result.add(post.node.fields.slug);
  //           return result;
  //         },
  //         new Set()
  //       );

  //       const translationsByDirectory = _.reduce(
  //         posts,
  //         (result, post) => {
  //           const directoryName = _.get(post, 'node.fields.directoryName');
  //           const langKey = _.get(post, 'node.fields.langKey');

  //           if (directoryName && langKey && langKey !== 'en') {
  //             (result[directoryName] || (result[directoryName] = [])).push(
  //               langKey
  //             );
  //           }

  //           return result;
  //         },
  //         {}
  //       );

  //       const defaultLangPosts = posts.filter(
  //         ({ node }) => node.fields.langKey === 'en'
  //       );
  //       _.each(defaultLangPosts, (post, index) => {
  //         const previous =
  //           index === defaultLangPosts.length - 1
  //             ? null
  //             : defaultLangPosts[index + 1].node;
  //         const next = index === 0 ? null : defaultLangPosts[index - 1].node;

  //         const translations =
  //           translationsByDirectory[_.get(post, 'node.fields.directoryName')] ||
  //           [];

  //         createPage({
  //           path: post.node.fields.slug,
  //           component: blogPost,
  //           context: {
  //             slug: post.node.fields.slug,
  //             previous,
  //             next,
  //             translations,
  //             translatedLinks: [],
  //           },
  //         });

  //         const otherLangPosts = posts.filter(
  //           ({ node }) => node.fields.langKey !== 'en'
  //         );
  //         _.each(otherLangPosts, post => {
  //           const translations =
  //             translationsByDirectory[_.get(post, 'node.fields.directoryName')];

  //           // Record which links to internal posts have translated versions
  //           // into this language. We'll replace them before rendering HTML.
  //           let translatedLinks = [];
  //           const { langKey, maybeAbsoluteLinks } = post.node.fields;
  //           maybeAbsoluteLinks.forEach(link => {
  //             if (allSlugs.has(link)) {
  //               if (allSlugs.has('/' + langKey + link)) {
  //                 // This is legit an internal post link,
  //                 // and it has been already translated.
  //                 translatedLinks.push(link);
  //               } else if (link.startsWith('/' + langKey + '/')) {
  //                 console.log('-----------------');
  //                 console.error(
  //                   `It looks like "${langKey}" translation of "${
  //                     post.node.frontmatter.title
  //                   }" ` +
  //                     `is linking to a translated link: ${link}. Don't do this. Use the original link. ` +
  //                     `The blog post renderer will automatically use a translation if it is available.`
  //                 );
  //                 console.log('-----------------');
  //               }
  //             }
  //           });

  //           createPage({
  //             path: post.node.fields.slug,
  //             component: blogPost,
  //             context: {
  //               slug: post.node.fields.slug,
  //               translations,
  //               translatedLinks,
  //             },
  //           });
  //         });
  //       });
  //     })
  //   );
  // });

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)



  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
