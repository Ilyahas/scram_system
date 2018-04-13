import React, { Component } from 'react'
import "./Header.css";
import DropdownOptions from "../DropdownOptions"

class ListItems extends Component {
  // onClick = index => {
  //   this.props.onTabClick(index)
  // }
  render() {
    let values = ['Home', 'Projects', 'Team', 'Users']
    let listItems = values.map((data, index) =>
      <li key={index.toString()}
        // onClick={() => this.onClick(index)}
        className={this.props.currentTab===index?'NavigationActive':''}>
        <a>{data}</a>
      </li>
    )
    return (
      <ul className="MenuItems">{listItems}</ul>
    );
  }
}



export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowUserOptions: false,
      currentActiveTab: 0
    }
  }
  onTabClick = currentIndex => {
    this.props.tabChanged(currentIndex);
    this.setState({ currentActiveTab: currentIndex }, () => {
      console.log("active tab = " + this.state.currentActiveTab)
    })
  }
  onClick = e => {
    this.setState({ isShowUserOptions: !this.state.isShowUserOptions })
  }

  isValidTabIndex(index) {
    return this.state.currentActiveTab === index
  }

  
  render() {
    return (
      <div>
        <header className="Header">
          <ListItems onTabClick={this.onTabClick} 
            currentTab ={this.state.currentActiveTab}
          />
          <ul className="UserInfo">
            <li>
              <div onClick={this.onClick} className="UserProf">
                <i className="fa fa-user-circle-o"></i>
              </div>
            </li>
            {this.state.isShowUserOptions && <DropdownOptions />}
          </ul>
        </header>
      </div>
    )
  }
}
