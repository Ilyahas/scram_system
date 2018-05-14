import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import User from '../../../components/Users'

export class Members extends Component {
  render() {
    return (
    <User/>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)
