import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import DropdownOptions from '../DropdownOptions'

const menuItems = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'Projects',
    url: '/projects',
  },
  {
    title: 'Team',
    url: '/teams',
  },
  // {
  //   title: 'Members',
  //   url: '/users',
  // },
]

class ListItems extends Component {
  render() {
    const values = menuItems.slice(0, menuItems.length)
    const listItems = values.map((data, index) => (
      <li key={index}>
        <NavLink to={data.url} activeClassName="NavigationActive">
          {data.title}
        </NavLink>
      </li>
    ))
    return <ul className="MenuItems">{listItems}</ul>
  }
}

export default class Header extends Component {
  render() {
    return (
      <div className="HeaderContainer">
        <header className="Header">
          <ListItems />
          <ul className="UserInfo">
            <li>
              <div onClick={() => this.props.showDropdownMenu()} className="UserProf">
                <i className="fa fa-cog" aria-hidden="true" />
              </div>
            </li>
            {this.props.isShowUserOptions && <DropdownOptions />}
          </ul>
        </header>
      </div>
    )
  }
}
