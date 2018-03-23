import React, { Component } from 'react'
import "./Header.scss"
export default class Header extends Component {
  render() {
    return (
     <header className="Header">
            <ul className="MenuItems">
                <li> <a>Home</a> </li>
                <li> <a>Projects</a> </li>
                <li> <a>Team</a> </li>
                <li> <a>Users</a> </li>
            </ul>
            <ul className="UserInfo">
                <li> <a>User</a> </li>
            </ul>
     </header>
    )
  }
}
