import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Teams from '../../../components/Teams'
import { userList } from '../../../actions/userSearch'
import api from '../../../utils/api'
class TeamContent extends React.Component {
  list = data => api.user.list(data)
  render() {
    return (
      <Teams list={this.list}
        users={this.props.users}
        isSuccess={this.props.isSuccess} />
    )
  }
}

TeamContent.propTypes = {
  userList: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
}
const mapStateToProps = (state) => ({
  users: state.userSearch.searchedUsers,
  isSuccess:state.userSearch.isSuccess
})

const mapDispatchToProps = {
  userList
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamContent)