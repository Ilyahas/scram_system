import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTeamDashboard, createTeamDashboard } from '../../../../actions/dashboard'
import { Board } from '../../Projects'
import { FlexContainer, BoardContainer } from '../../../../components/Project'
import gif from '../../../../assets/loading.gif'

export class DeskList extends Component {
  state = {
    isShowModal: false,
    value: '',
    teamSelected: '',
  }
  showModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }
  handleInputChange = (event) => {
    this.setState({ value: event.target.value })
  }
  teamChanged = (teamId) => {
    this.setState({ teamSelected: teamId })
    this.showModal()
  }
  addNewBoard = () => {
    const body = {}
    body.name = this.state.value
    body.teamId = this.state.teamSelected
    this.props.createTeamDashboard(body)
    this.showModal()
  }
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

    return (
      <BoardContainer
        boardSectionList={<Board dashboards={teamDashboards} isHeaderDisplay={false} teamChanged={this.teamChanged} />}
        isShowModal={this.state.isShowModal}
        handleInputChange={this.handleInputChange}
        addNewBoard={this.addNewBoard}
        showModal={this.showModal}
      />
    )
  }
}

const mapStateToProps = state => ({
  teamDashboards: state.allDashboards.teamDashboard,
  isRequested: state.allDashboards.isRequested,
})

const mapDispatchToProps = {
  getTeamDashboard,
  createTeamDashboard,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeskList)
