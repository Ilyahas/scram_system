import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TeamContent from './Teams'
export class HomePageContent extends Component {
  handleActive(url) {
    this.props.history.push(url)
  }
  render() {
    return (
      <div>
          {this.currentIndex(0) && <p>0</p>}
          {this.currentIndex(1) && <p>1</p>}  
          {this.currentIndex(2) && <TeamContent/>}
          {this.currentIndex(3) && <p>3</p>}
      </div>
    )
  }
  currentIndex(index){
   return this.props.index ===index;
  }
}

const mapStateToProps = (state) => ({
    index:state.tab.index,
})

const mapDispatchToProps = {
    
}
HomePageContent.propTypes={
  index:PropTypes.number.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePageContent)
