import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from '../../../components/Header'
import HomePageContent from './HomePageContent'
import  {tabChanged} from '../../../actions/header'
export class HomePage extends Component {
  tabChanged = data =>this.props.tabChanged(data);


  render() {
    return (
      <div>
        <Header tabChanged={this.tabChanged}/>
        <HomePageContent/>
      </div>
    )
  }
}
HomePage.propTypes={

}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  tabChanged:tabChanged,
}
HomePage.propTypes={
  tabChanged:PropTypes.number.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
