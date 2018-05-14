import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProjectPage from '../../../components/Project';

export class Projects extends Component {
  static propTypes = {
    prop: PropTypes,
  }

  render() {
    return (
      <div>
        <ProjectPage/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
