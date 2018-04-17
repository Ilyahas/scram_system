import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Teams from '../../../components/Teams'
import { createTeam, getCompany } from '../../../actions/company'
import api from '../../../utils/api'

class TeamContent extends React.Component {
  list = data => api.user.list(data)
  createTeam = data => { 
    this.props.createTeam(this.props.companyId, data)
  }
  componentDidMount() {
    this.props.getCompany()
  }
  render() {
    return (
      <Teams list={this.list}
        createTeam={this.createTeam}
        users={this.props.users}
        isSuccess={this.props.isSuccess}
        company={this.props.company} />
    )
  }
}

TeamContent.propTypes = {
  createTeam: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  users: state.userSearch.searchedUsers,
  companyId: state.company.id,
  isSuccess: state.userSearch.isSuccess,
  company: state.company,
})

const mapDispatchToProps = {
  createTeam,
  getCompany
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamContent)