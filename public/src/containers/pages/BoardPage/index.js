import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from '../../../components/Board'

export class BoardPage extends Component {
  render() {
    return <Board />
  }
}

const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(BoardPage)
