import * as React from "react"
import { Link, navigate } from "gatsby"
import qs from "qs"
import { useModal } from "./modal"

const locales = require("../utils/locales")
const modalConfig = require("./modal-config")

const QUERIES = modalConfig.map(item => item.type)

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

  const { source } = qs.parse(location.search, { ignoreQueryPrefix: true })
  const { Modal, setType } = useModal(location.pathname)

  React.useEffect(() => {
    if (QUERIES.some(query => query === source)) {
      setType(source)
    }
  }, [source, setType])

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer style={{ direction: "ltr" }}>
        © {new Date().getFullYear()}
        <div style={{ float: "right" }}>
          <Link to={isFa ? "/fa/" : "/"}>{locales[langKey].homeTitle}</Link>{" "}
          &bull; <Link to="/contact/">{locales[langKey].contact}</Link> &bull;{" "}
          <Link to={isFa ? "/" : "/fa/"}>{locales[langKey].otherBlog}</Link>{" "}
          &bull;{" "}
          <a
            href={isFa ? "/fa/rss.xml" : "/rss.xml"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {locales[langKey].rss}
          </a>
        </div>
        <Modal />
      </footer>
    </div>
  )
}

export default Layout
