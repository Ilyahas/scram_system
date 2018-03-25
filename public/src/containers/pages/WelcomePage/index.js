import React from 'react'
import PropTypes from 'prop-types'
import TopMenu from "../../../components/WelcomePage/TopMenu";
import MainPage from "../../../components/WelcomePage";
class WelcomePage extends React.Component {
  render () {
    return(
      <div>
        <MainPage/>
      </div>
    )
  }
}
WelcomePage.propTypes = {
  
}
export default WelcomePage;
