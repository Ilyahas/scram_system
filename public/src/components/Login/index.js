import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'
import '../Signup/Signup.scss'


class Login extends React.Component {
  state = {
    data: {
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
              <Input id="username" type="email" placeholder="email" />
              <Input id="password" type="password" placeholder="password" />
              <button>Login<i className="fa fa-fw fa-chevron-right"></i> </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login;
