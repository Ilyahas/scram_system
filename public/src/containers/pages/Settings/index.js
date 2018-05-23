import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SettingsPage from '../../../components/Settings'
import Desks from './Desks'
import Members from '../Members'

const menuItems = [
  {
    title: 'Desks',
    url: 'desks',
  },
  {
    title: 'Members',
    url: 'members',
  },
]
class ListItems extends React.Component {
  render() {
    const { teamName } = this.props
    const values = menuItems.slice(0, menuItems.length)
    const listItems = values.map((data, index) => (
      <li key={index}>
        <NavLink to={`/settings/${teamName}/${data.url}`} activeClassName="ActiveSettings">
          {data.title}
        </NavLink>
      </li>
    ))
    return <ul className="MenuItems">{listItems}</ul>
  }
}
export class Settings extends Component {
  //   static propTypes = {
  //     prop: PropTypes,
  //   }
  componentDidMount() {}
  render() {
    const { teamName } = this.props.match.params
    const { location } = this.props
    const index = location.pathname.lastIndexOf('/') + 1
    const dashId = location.pathname.slice(index)
    return (
      <div>
        <SettingsPage
          name={teamName}
          btnName={'Change team profile'}
          list={<ListItems teamName={teamName} />}
          />
        <Switch>
          <Redirect from='/settings/:teamName/team/:teamName/:dashboardId' to={`/team/${teamName}/${dashId}`}/>
          <Route path={'/settings/:teamName/desks'} component={Desks} />
          <Route path={'/settings/:teamName/members'} component={Members} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
