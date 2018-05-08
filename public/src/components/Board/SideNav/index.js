import React from 'react'
import gif from '../../../assets/loading.gif'

const SideNav = ({ showModal, isRequested }) => <div className="Sidenav ActiveSidenav">
    <div className="MenuContainer">
      <h1>Menu</h1>
      <button
        className="btn btn-block btn-success"
        data-toggle="modal"
        data-target="#myModal"
        onClick={showModal}
      >
       { isRequested ? <img src={gif} alt='loading' height='25' width='25'/>
        : <div>
        Add new list
        <i className="fa fa-plus" aria-hidden="true" /></div>}
      </button>
      <button className="btn btn-block btn-info">
        Chart
        <i className="fa fa-area-chart" aria-hidden="true" />
      </button>
      <h1>Participants</h1>
      <div className="Participans">
        <div className="User">
          <p>YK</p>
        </div>
      </div>
      <h1>History</h1>
    </div>
  </div>

export default SideNav
