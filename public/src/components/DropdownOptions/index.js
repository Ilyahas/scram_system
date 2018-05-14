// import Radium, { StyleRoot } from 'radium'
// import { fadeInDown } from 'react-animations'
import React, { Component } from 'react'
import './DropdownOptions.css'

// const styles = {
//   fadeInDown: {
//     animation: 'x 1s',
//     animationName: Radium.keyframes(fadeInDown, 'fadeInDown'),
//   }
// }

class DropdownOptions extends Component {
  render() {
    return (
      <div className="DbContainer DbMain">
        <div className="Nickname  DbSegment">
          Signed as {this.props.nickname}
        </div>
        <div className="Links DbSegment">
          <ul>
            <li>Profile</li>
            <li>Blabla</li>
            <li>Blabla</li>
            <li>Blabla</li>
          </ul>
        </div>
        <div className="Links DbSegment">
          <ul>
            <li>Settings</li>
            <li>Sign out</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default DropdownOptions
