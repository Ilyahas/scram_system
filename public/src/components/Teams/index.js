import React, { Component } from 'react'
import './Teams.css'



let Button = () => {
    return (
        <div className="ButtonContainer">
            <button className="AddButton">
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
                <h2 class='TeamLead'>Team lead: <label>Name</label></h2>
            </div>
            <div className="MoreInfo">
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
        </div>
    )
}



export default class Teams extends Component {
    render() {
        return (
            <div className="backClr">
                <div className="FlexContainer">
                    <Button />
                    <TeamItem/>
                    <TeamItem/>
                    <TeamItem/>
                </div>
            </div>
        )
    }
}
