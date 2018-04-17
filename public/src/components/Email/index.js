import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../Signup/Signup.css'
import './Email.css'
export class Email extends Component {
  render() {
    return (
      <div className="m-block">
        <div className="bg-black"></div>
        <div className="bg-img-block"></div>
        <div className="backImg">
          <div className="App">
            <div className="Modal">
              <form onSubmit={this.props.submit} className="ModalForm">

                <h1>
                  Email
                {this.props.isError ? " confirmation failed" : " confirmed"}
                </h1>
                {!this.props.isError &&
                  <button>
                    Got It<i className="fa fa-fw fa-chevron-right"></i>
                  </button>}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Email.propTypes = {
  isError: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
}
