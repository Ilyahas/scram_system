import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FlexContainer, BoardHeader, BoardItem, BoardSection, BoardContainer } from '../../../components/Project'
import { getCompanyTeamsWithDashboards, createDashboard } from '../../../actions/dashboard'
import { getCompany } from '../../../actions/company'
import gif from '../../../assets/loading.gif'

class Projects extends React.Component {
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
    this.props.createDashboard(body)
    this.showModal()
  }
  componentDidMount() {
    this.props.getCompanyTeamsWithDashboards(localStorage.companyId)
  }
  render() {
    const { dashboards, isRequested } = this.props
    if (isRequested) return <FlexContainer><img src={gif} alt="loading" height="50" width="50"/></FlexContainer>

    return <BoardContainer
    boardSectionList={<Board dashboards={dashboards}
    isHeaderDisplay = {true}
    teamChanged={this.teamChanged}/>}

    isShowModal={this.state.isShowModal}
    handleInputChange = {this.handleInputChange}
    addNewBoard = {this.addNewBoard}
    showModal = {this.showModal}
    />
  }
}
export const Board = ({ dashboards, isHeaderDisplay, teamChanged }) => {
  const board = dashboards.map((teamDashboards) => {
    const header = <BoardHeader headerName={teamDashboards.teamName} />
    const boardList = teamDashboards.dashboards.map(item => (
      <BoardItem key={item._id} boardName={item.name} toLink={`team/${teamDashboards.teamName}/${item._id}`} />
    ))
    return <BoardSection key={teamDashboards._id}
    header={ isHeaderDisplay ? header : null}
    listItems={boardList}
    teamId={teamDashboards._id}
    teamChanged = {teamChanged}
    />
  })
  return board
}
Projects.propTypes = {
  getCompanyTeamsWithDashboards: PropTypes.func.isRequired,
  dashboards: PropTypes.array.isRequired,
  isRequested: PropTypes.bool.isRequired,
  companyId: PropTypes.string.isRequired,
}
const mapStateToProps = state => ({
  dashboards: state.allDashboards.dashboards,
  isRequested: state.allDashboards.isRequested,
  isError: state.allDashboards.isError,
  companyId: state.company.id,
})
const mapDispatchToProps = {
  getCompanyTeamsWithDashboards,
  getCompany,
  createDashboard,
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
