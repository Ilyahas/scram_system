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
  onChange = e =>  this.setState({
    ...this.state,
    data: { ...this.state.data, [e.target.placeholder]: e.target.value }
  });

  onSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.data)
  }


  render() {
    return (
      <div className="backImg">
        <div className="App">
          <div className="Modal">
            <form onSubmit={this.onSubmit} className="ModalForm">
              <Input id="username" type="email" placeholder="email" onChange={this.onChange}/>
              <Input id="password" type="password" placeholder="password" onChange={this.onChange}/>
              {this.props.errorMessage.error&&
              <p className="Allert">Can not log in</p>}
              <button>Login<i className="fa fa-fw fa-chevron-right"></i> </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login;
