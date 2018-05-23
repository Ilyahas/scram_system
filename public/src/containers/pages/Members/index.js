import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { UserList, UserItem } from '../../../components/Settings/Members'
import { getTeamDashboard } from '../../../actions/dashboard'
import { FlexContainer } from '../../../components/Project'
import gif from '../../../assets/loading.gif'

export class Members extends Component {
  componentDidMount() {
    const { teamName } = this.props.match.params
    this.props.getTeamDashboard(teamName)
  }
  render() {
    const { teamDashboards, isRequested } = this.props
    if (isRequested) {
      return (
        <FlexContainer>
          <img src={gif} alt="loading" height="50" width="50" />
        </FlexContainer>
      )
    }
    if (!teamDashboards[0]) return null
    const userItems = teamDashboards[0].members.map(item => (
      <UserItem firstname={item.firstname} lastname={item.lastname} nickname={item.nickname} />
    ))
    return <UserList>{userItems}</UserList>
  }
}
const mapStateToProps = state => ({
  teamDashboards: state.allDashboards.teamDashboard,
  isRequested: state.allDashboards.isRequested,
})

const mapDispatchToProps = {
  getTeamDashboard,
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)
