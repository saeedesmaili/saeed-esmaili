import React from "react"

import "./signup.css"

const FORM_ID = "2262749"

class Signup extends React.Component {
  render() {
    return (
      <form
        action="https://app.convertkit.com/forms/2262749/subscriptions"
        style={{ backgroundColor: "rgb(249, 250, 251)", borderRadius: 4 }}
        className="seva-form formkit-form"
        method="post"
        data-sv-form={2262749}
        data-uid="de1eed4248"
        data-format="inline"
        data-version={5}
        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
        min-width="400 500 600 700 800"
      >
        <div style={{ opacity: "0.2" }} className="formkit-background" />
        <div data-style="minimal">
          <div
            className="formkit-header"
            style={{ color: "rgb(77, 77, 77)", fontSize: 27, fontWeight: 700 }}
            data-element="header"
          >
            <h2>Join the Newsletter</h2>
          </div>
          <div
            className="formkit-subheader"
            style={{ color: "rgb(104, 104, 104)", fontSize: 18 }}
            data-element="subheader"
          >
            <p>Subscribe to get datanerd's latest content by email.</p>
          </div>
          <ul
            className="formkit-alert formkit-alert-error"
            data-element="errors"
            data-group="alert"
          />
          <div
            data-element="fields"
            data-stacked="true"
            className="seva-fields formkit-fields"
          >
            <div className="formkit-field">
              <input
                className="formkit-input"
                aria-label="Name"
                style={{
                  color: "rgb(0, 0, 0)",
                  borderColor: "rgb(227, 227, 227)",
                  borderRadius: 4,
                  fontWeight: 400,
                }}
                name="fields[first_name]"
                placeholder="Name"
                type="text"
              />
            </div>
            <div className="formkit-field">
              <input
                className="formkit-input"
                name="email_address"
                style={{
                  color: "rgb(0, 0, 0)",
                  borderColor: "rgb(227, 227, 227)",
                  borderRadius: 4,
                  fontWeight: 400,
                }}
                aria-label="Email Address"
                placeholder="Email Address"
                required
                type="email"
              />
            </div>
            <button
              data-element="submit"
              className="formkit-submit formkit-submit"
              style={{
                color: "rgb(255, 255, 255)",
                backgroundColor: "rgb(55, 0, 179)",
                borderRadius: 4,
                fontWeight: 700,
              }}
            >
              <div className="formkit-spinner">
                <div />
                <div />
                <div />
              </div>
              <span className>Subscribe</span>
            </button>
          </div>
          <div
            className="formkit-guarantee"
            style={{ color: "rgb(77, 77, 77)", fontSize: 13, fontWeight: 400 }}
            data-element="guarantee"
          >
            <p>I won't send you spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </form>
    )
  }
}

export default Signup
