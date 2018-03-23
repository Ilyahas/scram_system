import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from '../../../components/Header'
export class HomePage extends Component {
  render() {
    return (
      <div>
        <Header/>
      </div>
    )
  }
}
HomePage.propTypes={

}
const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
