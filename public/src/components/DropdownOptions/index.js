// import Radium, { StyleRoot } from 'radium'
// import { fadeInDown } from 'react-animations'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import React, { Component } from 'react'
import './DropdownOptions.css'
// const styles = {
//   fadeInDown: {
//     animation: 'x 1s',
//     animationName: Radium.keyframes(fadeInDown, 'fadeInDown'),
//   }
// }

class DropdownOptions extends Component {
  logOut = () => {
    localStorage.removeItem('JWT')
    localStorage.removeItem('companyId')
    window.location.reload()
  }
  render() {
    return (
      <div className="DbContainer DbMain">
        {/* <div className="Nickname  DbSegment">
          Signed as {this.props.nickname}
        </div>
        <div className="Links DbSegment">
          <ul>
            <li>Profile</li>
            <li>Blabla</li>
            <li>Blabla</li>
            <li>Blabla</li>
          </ul>
        </div> */}
        <div className="Links DbSegment">
          <ul>
            {/* <li>Settings</li> */}
            <li onClick={() => this.logOut()}>Sign out</li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  isSuccess: state.user.isSuccess,
  errorMessage: state.user.errorMessage,
});
export default connect(mapStateToProps, {  })(DropdownOptions);

