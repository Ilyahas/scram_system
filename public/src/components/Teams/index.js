import React, { Component } from 'react'
import './Teams.css'
import AddTeamModal from './AddTeamModal'
import PropTypes from 'prop-types'

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


let TeamItem = () => {
    return (
        <div className="TeamItem">
            <div className="TeamDetails">
                <h2> Team Name</h2>
                <h2 className='TeamLead'>Team lead: <label>Name</label></h2>
            </div>
            <div className="MoreInfo">
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
        </div>
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
        }), () => {
            console.log(this.state.isModalOpen)
        })
    }
    render() {
        return (
            <div className="backClr">
                <div className="FlexContainer">
                    <Button modal={this.modal} />
                    <AddTeamModal
                        list={this.props.list}
                        show={this.state.isModalOpen}
                        users={this.props.users}
                        onClose={this.modal}
                        isSuccess={this.props.isSuccess} />
                    <TeamItem />
                    <TeamItem />
                    <TeamItem />
                </div>
            </div>
        )
    }
}
Teams.propTypes = {
    list: PropTypes.func.isRequired,
}
