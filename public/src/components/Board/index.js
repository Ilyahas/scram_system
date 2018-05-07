import PropTypes from 'prop-types'
import React from 'react'
import Board from 'react-trello'
import './Board.css'
import Modal from '../Modal'

// const data = require('./data.json')

export default class BoardPan extends React.Component {
  // getBoard() {
  //   return new Promise((resolve) => {
  //     resolve(data)
  //   })
  // }

  completeCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {
        id: 'Milk',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Use Headspace app',
      },
    })
    this.state.eventBus.publish({ type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk' })
  }

  addCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: {
        id: 'Ec2Error',
        title: 'EC2 Instance Down',
        label: '30 mins',
        description: 'Main EC2 instance down',
      },
    })
  }
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
        <div className="Sidenav ActiveSidenav">
          <div className="MenuContainer">
            <h1>Menu</h1>
            <button
              className="btn btn-block btn-success"
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.showModal}
              value={this.props.value}
            >
              Add new list
              <i className="fa fa-plus" aria-hidden="true" />
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
        {this.props.isShowModal && (
          <Modal
            handleInputChange={this.handleInputChange}
            showModal={this.showModal}
            labelName="New List Name:"
            name="Create New List"
            addNewList={this.addNewList}
          />
        )}
      </div>
    )
  }
}
BoardPan.propTypes = {
  lanes: PropTypes.array.isRequired,
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
