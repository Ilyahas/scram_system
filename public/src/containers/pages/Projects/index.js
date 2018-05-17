import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BoardHeader, BoardItem, BoardSection, BoardContainer } from '../../../components/Project'
import { getCompanyTeamsWithDashboards } from '../../../actions/dashboard'
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
    console.log(this.state.teamId)
  }
  componentDidMount() {
    this.props.getCompanyTeamsWithDashboards(localStorage.companyId)
  }
  render() {
    const { dashboards, isRequested, isError } = this.props
    if (!isRequested) return <img src={gif} alt="loading" />
    if (isError) return null
    const board = dashboards.map((teamDashboards) => {
      const header = <BoardHeader headerName={teamDashboards.teamName} />
      const boardList = teamDashboards.dashboards.map(item => (
        <BoardItem key={item._id} boardName={item.name} toLink={`team/${teamDashboards.teamName}/${item._id}`} />
      ))
      return <BoardSection key={teamDashboards._id}
      header={header}
      listItems={boardList}
      teamId={teamDashboards._id}
      teamChanged = {this.teamChanged}
      />
    })
    return <BoardContainer boardSectionList={board}
    isShowModal={this.state.isShowModal}
    handleInputChange = {this.handleInputChange}
    addNewBoard = {this.addNewBoard}
    showModal = {this.showModal}
    />
  }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
