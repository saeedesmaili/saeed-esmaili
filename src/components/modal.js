import React, { useCallback, useEffect, useState } from "react"

import usePortal from "react-cool-portal"
import { navigate } from "gatsby"

export const EMAIL_CONFIRMATION_EN = "email-confirmation-en"
export const CONFIRMATION_SUCCESS_EN = "confirmation-success-en"
export const EMAIL_CONFIRMATION_FA = "email-confirmation-fa"
export const CONFIRMATION_SUCCESS_FA = "confirmation-success-fa"

export const MODAL_DATA = [
  {
    type: EMAIL_CONFIRMATION_EN,
    title: "Success!",
    description: "Now check your email to confirm your subscription.",
  },
  {
    type: CONFIRMATION_SUCCESS_EN,
    title: "Done!",
    description: "Thanks for subscribing.",
  },
  {
    type: EMAIL_CONFIRMATION_FA,
    title: "ثبت شد!",
    description:
      "الان لازمه که به ایمیلتون برید و با کلیک روی لینکی که براتون ارسال شده، عضویتتون رو تایید کنید.",
  },
  {
    type: CONFIRMATION_SUCCESS_FA,
    title: "تایید شد!",
    description: "ممنون که عضو خبرنامه دیتانرد هستید.",
  },
]

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
    const info = MODAL_DATA.filter(item => item.type === type)
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
      />
    </Portal>
  )

  return { Modal, show, hide, setType }
}

const ModalInfo = ({ title, description, hide }) => {
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
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
