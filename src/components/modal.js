import React, { useCallback, useEffect, useState } from "react"

import usePortal from "react-cool-portal"
import { navigate } from "gatsby"

const modalConfig = require("./modal-config")

export const EMAIL_CONFIRMATION_EN = "email-confirmation-en"
export const CONFIRMATION_SUCCESS_EN = "confirmation-success-en"
export const EMAIL_CONFIRMATION_FA = "email-confirmation-fa"
export const CONFIRMATION_SUCCESS_FA = "confirmation-success-fa"

export const useModal = pathname => {
  const { Portal, hide, show, isShow } = usePortal({
    defaultShow: false,
    onHide: () => {
      navigate(pathname)
    },
  })

  const [type, setType] = useState(null)
  const [info, setInfo] = useState({})

  useEffect(() => {
    const info = modalConfig.filter(item => item.type === type)
    setInfo(...info)
  }, [type])

  useEffect(() => {
    if (info?.title) {
      show()
    }
  }, [info])

  const Modal = () => (
    <Portal>
      <ModalInfo
        hide={hide}
        title={info?.title}
        description={info?.description}
        button={info?.button}
      />
    </Portal>
  )

  return { Modal, show, hide, setType }
}

const ModalInfo = ({ title, description, button, hide }) => {
  const handleClickBackdrop = e => {
    const { id } = e.target
    if (id === "modal") hide()
  }
  return (
    <div
      className="modal"
      id="modal"
      tabIndex={-1}
      onClick={handleClickBackdrop}
    >
      <div
        className="modal-container"
        role="dialog"
        aria-labelledby="modal-label"
        aria-modal="true"
      >
        <div className="modal-bar">
          <button className="modal-close" onClick={hide} aria-label="Close">
            <span>&#215;</span>
          </button>
        </div>
        <div className="modal-content-container">
          <h3 className="modal-header">{title}</h3>
          <p className="modal-content">{description}</p>

          <button className="modal-button" onClick={hide}>
            {button}
          </button>
        </div>
      </div>
    </div>
  )
}
