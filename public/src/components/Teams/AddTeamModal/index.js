import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './modal.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css';

const AsyncItem = ({ label, isMulti, members, onChange, getUsers }) => {
    const AsyncComponent = Select.Async;
    return (
        <div className="PaddingTop">
            <h3 className="section-heading">{label}</h3>
            <AsyncComponent multi={isMulti}
                value={members}
                onChange={onChange}
                valueKey="_id"
                labelKey="email"
                loadOptions={getUsers}
                backspaceRemoves={true} />
        </div>
    )
}
export default class AddTeamModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamName: '',
            teamlead: {},
            manager: {},
            members: [],
            multi: false
        }
    }
    onTeamNameChange = e => this.setState({
        teamName: e.target.value
    })
    onTeamleadChange = teamlead => this.setState({
        teamlead: teamlead
    })
    onManagerChange = manager => this.setState({
        manager: manager
    })
    onChange = members => this.setState({
        members: members,
    });

    getUsers = (input) => {
        if (!input) {
            return Promise.resolve({ options: [] });
        }
        return this.props.list(input).then(data => {
            return {
                options: data
            };
        })
    }
    render() {
        if (!this.props.show) return null
        return (
            <div className="BackdropStyle">
                <div className="ModalStyle">
                    <button className='CloseButton' onClick={this.props.onClose}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <h3 className="section-heading">Team Name:</h3>
                    <input placeholder="name"
                        className="TeamInput"
                        value={this.state.teamName}
                        onChange={this.onTeamNameChange}></input>
                    <AsyncItem label={'Team Members:'}
                        isMulti={true}
                        members={this.state.members}
                        onChange={this.onChange}
                        getUsers={this.getUsers} />
                    <AsyncItem label={'TeamLead:'}
                        isMulti={false}
                        members={this.state.teamlead}
                        onChange={this.onTeamleadChange}
                        getUsers={this.getUsers} />
                    <AsyncItem label={'PM:'}
                        isMulti={false}
                        members={this.state.manager}
                        onChange={this.onManagerChange}
                        getUsers={this.getUsers} />

                    <button className="btn btn-success btn-block">Create Team</button>
                </div>
            </div>
        )
    }
}
AddTeamModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
};
