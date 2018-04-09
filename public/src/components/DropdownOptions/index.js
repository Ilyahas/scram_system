import React, { Component } from 'react';
import "./DropdownOptions.css"
import { fadeInDown } from 'react-animations'
import Radium, {StyleRoot} from 'radium';


const styles = {
    fadeInDown: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    }
}

class DropdownOptions extends Component {
    render() {
        return (
            <StyleRoot className="DbMain">
            <div className="DbContainer" style={styles.fadeInDown}>
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
            </StyleRoot>
        );
    }
}

export default DropdownOptions;