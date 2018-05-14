import PropTypes from 'prop-types'
import React from 'react'
import Board from 'react-trello'
import './Board.css'
import Modal from '../Modal'
import SideNav from './SideNav'

export default class BoardPan extends React.Component {
  render() {
    const onbj = {}
    onbj.lanes = this.props.lanes
    return (
      <div className="Container">
        <Board
          className="SideMenuActive"
          editable
          customCardLayout
          onCardAdd={this.props.handleCardAdd}
          onCardDelete={this.props.handleCardDelete}
          data={onbj}
          draggable
          onDataChange={this.props.shouldReceiveNewData}
          eventBusHandle={this.props.setEventBus}
          handleDragStart={this.props.handleDragStart}
          handleDragEnd={this.props.handleDragEnd}
          addCardLink={<button className="btn btn-block btn-success btn-card">Add card</button>}
        >
          <CustomCard />
        </Board>
        <SideNav showModal={this.props.showModal} isRequested={this.props.isRequested} />
        {this.props.isShowModal && (
          <Modal
            handleInputChange={this.props.handleInputChange}
            labelName="New List Name:"
            name="Create New List"
            addNewList={this.props.addNewList}
          >
            <label htmlFor="usr">New List Name:</label>
            <input type="text" className="form-control" id="usr" onChange={this.props.handleInputChange} />
          </Modal>
        )}
      </div>
    )
  }
}
BoardPan.propTypes = {
  lanes: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
}
const CustomCard = props => (
  <div className="Card">
    <header className="card-header">
      <div className="title">{props.title}</div>
      <div className="time">{props.label}</div>
    </header>
    <div className="Description">
      <div>{props.description}</div>
    </div>
    <div className="Participans ">
      <div className="User Small">
        <p>YK</p>
      </div>
    </div>
  </div>
)
