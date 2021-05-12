import * as React from "react"
import { Link } from "gatsby"

const locales = require("../utils/locales")

const Layout = ({ location, title, children, langKey }) => {
  const rootPaths = [
    `${__PATH_PREFIX__}/`,
    `${__PATH_PREFIX__}/fa/`,
    `${__PATH_PREFIX__}/fa`,
  ]
  const isRootPath = rootPaths.includes(location.pathname)
  const isFa = location.pathname.includes("/fa/")
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to={location.pathname}>{title}</Link>
      </h1>
    )
  } else if (isFa) {
    header = (
      <Link className="header-link-home" to="/fa/">
        {title}
      </Link>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer style={{ direction: "ltr" }}>
        © {new Date().getFullYear()}
        <div style={{ float: "right" }}>
          <Link to={isFa ? "/fa/" : "/"}>{locales[langKey].homeTitle}</Link>{" "}&bull;{" "}
          <Link to="/contact/">{locales[langKey].contact}</Link>{" "}&bull;{" "}
          <Link to={isFa ? "/" : "/fa/"}>{locales[langKey].otherBlog}</Link>{" "}&bull;{" "}
          <a
            href={isFa ? "/fa/rss.xml" : "/rss.xml"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {locales[langKey].rss}
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
