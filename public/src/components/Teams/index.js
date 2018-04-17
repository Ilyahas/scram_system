import React, { Component } from 'react'
import './Teams.css'
import AddTeamModal from './AddTeamModal'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
let Button = ({ modal }) => {
    const onClick = e => {
        e.preventDefault()
        modal()
    }
    return (
        <div className="ButtonContainer">
            <button onClick={onClick} className="AddButton">
                <i className="fa fa-plus"></i>
            </button>
        </div>
    )
}


let TeamItem = ({ teamName, teamlead }) => {
    return (
        <div className="TeamItem">
            <div className="TeamDetails">
                <h2>{teamName} </h2>
                <h2 className='TeamLead'>Team lead: <label>{teamlead}</label></h2>
            </div>
            <div className="MoreInfo">
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
        </div>
    )
}
let TeamItems = ({ listOfTeams }) => {
    return (
        listOfTeams.map(
            (elem) =>
                <Link key={elem._id} to={`/team/${elem.teamName}`}>
                    <TeamItem
                        teamName={elem.teamName}
                        teamlead={elem.teamlead.email} />
                </Link>
        )
    )
}


export default class Teams extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
    }
    modal = () => {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen
        }))
    }
    render() {
        return (
            <div className="backClr">
                <div className="FlexContainer">
                    <Button modal={this.modal} />
                    <AddTeamModal
                        createTeam={this.props.createTeam}
                        list={this.props.list}
                        show={this.state.isModalOpen}
                        users={this.props.users}
                        onClose={this.modal}
                        isSuccess={this.props.isSuccess} />
                    {this.props.company.isRequested ?
                        (<img alt='loading' src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />) :
                        (<TeamItems listOfTeams={this.props.company.listOfTeams} />)
                    }
                </div>
            </div>
        )
    }
}
Teams.propTypes = {
    list: PropTypes.func.isRequired,
    createTeam: PropTypes.func.isRequired,
}
