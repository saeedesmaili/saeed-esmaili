import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPaths = [`${__PATH_PREFIX__}/`, `${__PATH_PREFIX__}/fa/`, `${__PATH_PREFIX__}/fa`]
  const isRootPath = rootPaths.includes(location.pathname)
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to={location.pathname}>{title}</Link>
      </h1>
    )
  } else if (location.pathname.includes("/fa/")) {
    header = (
      <Link className="header-link-home" to="/fa/">{title}</Link>
    )
  } else {
    <Link className="header-link-home" to="/">{title}</Link>
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}
        <div style={{ float: 'right' }}>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">rss</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
