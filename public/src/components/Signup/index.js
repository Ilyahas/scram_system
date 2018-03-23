import React from 'react'
import Input from '../Input'
import './Signup.scss'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        nickname: "",
        email: "",
        password: ""
      },
      loading: false,
      errors: {}
    }
  }

  onChange = e =>  this.setState({
    ...this.state,
    data: { ...this.state.data, [e.target.placeholder]: e.target.value }
  });

  onSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.data)
      .catch(err => {
        // this.setState({ errors: err.response.data.errors, loading: false })
        console.log("HERE ERROR"+err)
      }
      );
  }

  render() {
    return (
      <div className="backImg">
        <div className="App">
          <div className="Modal">
            <form onSubmit={this.onSubmit} className="ModalForm">
              <Input id="name" type="text" placeholder="nickname" onChange={this.onChange} />
              <Input id="username" type="email" placeholder="email" onChange={this.onChange} />
              <Input id="password" type="password" placeholder="password" onChange={this.onChange} />
              {this.props.errorMessage.duplicate&&
              <p className="Allert">Such {this.props.errorMessage.duplicate} exists</p>}
              <button>Signup<i className="fa fa-fw fa-chevron-right"></i> </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;
