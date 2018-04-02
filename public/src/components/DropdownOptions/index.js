import React, { Component } from 'react';
import "./DropdownOptions.css"
class DropdownOptions extends Component {
    render() {
        return (
            <div className="DbContainer ">
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
        );
    }
}

export default DropdownOptions;