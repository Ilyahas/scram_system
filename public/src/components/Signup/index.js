import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Input from '../Input'
import './Signup.css'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        companyName: '',
        email: '',
        password: '',
      },
      loading: false,
      errors: {},
    }
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.placeholder]: e.target.value,
      },
    })

  onSubmit = (e) => {
    e.preventDefault()
    this.props.submit(this.state.data)
  }

  render() {
    return (
      <div className="m-block">
        <div className="bg-black" />
        <div className="bg-img-block" />

        <div className="backImg">
          <div className="App">
            <div className="homeBack">
              <Link className="LinkStylinngBtn" to="/">
                <i className="fa fa-fw fa-chevron-left" /> HOME
              </Link>
            </div>
            <div className="RegModal">
              <form onSubmit={this.onSubmit} className="ModalForm">
                <Input
                  id="name"
                  type="text"
                  placeholder="companyName"
                  onChange={this.onChange}
                />
                <Input
                  id="username"
                  type="email"
                  placeholder="email"
                  onChange={this.onChange}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  onChange={this.onChange}
                />
                {!!this.props.errorMessage && (
                  <p className="Allert">
                    Such {this.props.errorMessage.duplicate} exists
                  </p>
                )}
                <button className="btn">
                  Signup<i className="fa fa-fw fa-chevron-right" />{' '}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Signup.propTypes = {
  errorMessage: PropTypes.object,
}
export default Signup
