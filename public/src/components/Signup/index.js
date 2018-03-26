import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../Input'
import './Signup.css'
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
        <div className="m-block">


          <div className="bg-black"></div>
          <div className="bg-img-block"></div>

          <div className="backImg">

            <div className="App">
              <div className="homeBack">
                <Link className="LinkStylinngBtn"  to='/'><i className="fa fa-fw fa-chevron-left"></i> HOME</Link>
              </div>
              <div className="Modal">
                <form onSubmit={this.onSubmit} className="ModalForm">
                  <Input id="name" type="text" placeholder="nickname" onChange={this.onChange} />
                  <Input id="username" type="email" placeholder="email" onChange={this.onChange} />
                  <Input id="password" type="password" placeholder="password" onChange={this.onChange} />
                  {this.props.errorMessage.duplicate&&
                  <p className="Allert">Such {this.props.errorMessage.duplicate} exists</p>}
                  <button className="btn">Signup<i className="fa fa-fw fa-chevron-right"></i> </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Signup;
