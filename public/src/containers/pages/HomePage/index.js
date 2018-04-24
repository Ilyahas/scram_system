import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../../../components/Home'
import { token } from '../../../actions/auth'

export class HomePage extends Component {
  componentDidMount() {
    this.props.token(localStorage.JWT)
  }
  render() {
    return <Home />
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  token,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
