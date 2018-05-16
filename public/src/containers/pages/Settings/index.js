import { Route, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SettingsPage from '../../../components/Settings'
import Desks from '../../../components/Settings/Desks'
import Members from '../../../components/Settings/Members'

const menuItems = [
  {
    title: 'Home',
    url: '/settings/rendering',
  },
  {
    title: 'Projects',
    url: '/settings/components',
  },
  {
    title: 'Team',
    url: '/settings/props-v-state',
  },
]
class ListItems extends React.Component {
  render() {
    const values = menuItems.slice(0, menuItems.length)
    const listItems = values.map((data, index) => (
      <li key={index}>
        <NavLink to={data.url} activeClassName="ActiveSettings">
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

  render() {
    return (
      <div>
        <SettingsPage name={'name'}
         additionalInf={'some info'}
         description={'description'}
         btnName={'btnName'}
         list={<ListItems /> }
        />
        <Route path={'/settings/rendering'} component = {Desks} />
        <Route path={'/settings/components'} component = {Members} />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
