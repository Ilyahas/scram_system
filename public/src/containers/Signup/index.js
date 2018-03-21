import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'
import './Signup.scss'


class Signup extends React.Component {
  state = {
    data: {
      nickname: "",
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  }
  onChange = e =>
    this.setState({ ...this.state.data, [e.target.name]: e.target.value });


  render() {
    return (
      <div className="backImg">
        <div className="App">
          <div className="Modal">
            <form onSubmit={this.props.onSubmit} className="ModalForm">
              <Input id="name" type="text" placeholder="nickname" />
              <Input id="username" type="email" placeholder="email" />
              <Input id="password" type="password" placeholder="password" />
              <button>Log in<i className="fa fa-fw fa-chevron-right"></i> </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;
