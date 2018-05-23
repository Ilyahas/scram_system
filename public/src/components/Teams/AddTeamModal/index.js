import Select from 'react-select'
import 'react-select/dist/react-select.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './modal.css'

const AsyncItem = ({
  label, isMulti, members, onChange, getUsers,
}) => {
  const AsyncComponent = Select.Async
  return (
    <div className="PaddingTop">
      <h3 className="section-heading">{label}</h3>
      <AsyncComponent
        multi={isMulti}
        value={members}
        onChange={onChange}
        valueKey="_id"
        labelKey="nickname"
        loadOptions={getUsers}
        backspaceRemoves={true}
      />
    </div>
  )
}
const INITIAL_STATE = {
  teamName: '',
  teamlead: {},
  manager: {},
  members: [],
}
export default class AddTeamModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamName: '',
      teamlead: {},
      manager: {},
      members: [],
    }
  }
  onTeamNameChange = e =>
    this.setState({
      teamName: e.target.value,
    })
  onTeamleadChange = teamlead =>
    this.setState({
      teamlead,
    })
  onManagerChange = manager =>
    this.setState({
      manager,
    })
  onChange = members =>
    this.setState({
      members,
    })

  getUsers = (input) => {
    if (!input) {
      return Promise.resolve({ options: [] })
    }
    return this.props.list(input).then(data => ({
      options: data,
    }))
  }
  createTeam = () => {
    this.props.onClose()
    const copyObj = {}
    copyObj.teamName = this.state.teamName
    copyObj.teamlead = this.state.teamlead._id
    copyObj.manager = this.state.manager._id
    copyObj.members = this.state.members.map(data => data._id)
    this.setState({ ...INITIAL_STATE })
    this.props.createTeam(copyObj)
  }
  render() {
    if (!this.props.show) return null
    return (
      <div className="BackdropStyle">
        <div className="ModalStyle">
          <button className="CloseButton" onClick={this.props.onClose}>
            <i className="fa fa-times" aria-hidden="true" />
          </button>
          <h3 className="section-heading">Team Name:</h3>
          <input placeholder="name" className="TeamInput" value={this.state.teamName} onChange={this.onTeamNameChange} />
          <AsyncItem
            label={'Team Members:'}
            isMulti={true}
            members={this.state.members}
            onChange={this.onChange}
            getUsers={this.getUsers}
          />
          <AsyncItem
            label={'TeamLead:'}
            isMulti={false}
            members={this.state.teamlead}
            onChange={this.onTeamleadChange}
            getUsers={this.getUsers}
          />
          <AsyncItem label={'PM:'} isMulti={false} members={this.state.manager} onChange={this.onManagerChange} getUsers={this.getUsers} />

          <button className="btn btn-success btn-block" onClick={this.createTeam}>
            Create Team
          </button>
        </div>
      </div>
    )
  }
}
AddTeamModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  createTeam: PropTypes.func.isRequired,
  show: PropTypes.bool,
}
