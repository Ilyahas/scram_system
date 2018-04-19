import React from 'react';
import Board from 'react-trello';
import './Board.css';
import Modal from '../Modal'
const data = require('./data.json');
const handleDragStart = (cardId, laneId) => {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}
export default class BoardPan extends React.Component {
  state = {
    boardData:
      {
        lanes: []
      },
    isShowModal: false,
    value: ''
  }
  showModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }
  setEventBus = eventBus => {
    this.setState({ eventBus })
  }

  async componentWillMount() {
    const response = await this.getBoard()
    this.setState({ boardData: response })
  }

  getBoard() {
    return new Promise(resolve => {
      resolve(data)
    })
  }

  completeCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: { id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app' }
    })
    this.state.eventBus.publish({ type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk' })
  }

  addCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: { id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down' }
    })
  }

  shouldReceiveNewData = nextData => {
    console.log('New card has been added')
    console.log(nextData)
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }
  addNewList = () => {
    let boardData = { ...this.state.boardData }
    boardData.lanes = [...boardData.lanes, {
      "id": `${this.state.value.toUpperCase()}`,
      "title": `${this.state.value}`,
      "cards": []
    }]
    this.setState({ boardData, isShowModal: false })
  }
  handleInputChange = (event) => {
    this.setState({ value: event.target.value })
  }
  render() {
    return (
      <div className="Container">
        <Board className='SideMenuActive'
          editable
          customCardLayout
          onCardAdd={this.handleCardAdd}
          data={this.state.boardData}
          draggable
          onDataChange={this.shouldReceiveNewData}
          eventBusHandle={this.setEventBus}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          addCardLink={<button className="btn btn-block btn-success btn-card">Add card</button>

          }
        >
          <CustomCard />
        </Board>
        <div className="Sidenav ActiveSidenav">
          <div className="MenuContainer">
            <h1>Menu</h1>
            <button className="btn btn-block btn-success"
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.showModal}
              value={this.state.value}
            >Add new list
            <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <button className="btn btn-block btn-info">
              Chart
             <i className="fa fa-area-chart" aria-hidden="true"></i>
            </button>
            <h1>Participants</h1>
            <div className='Participans'>
              <div className="User">
                <p>YK</p>
              </div>
            </div>
            <h1>History</h1>
          </div>
        </div>
        {this.state.isShowModal && (<Modal
          handleInputChange={this.handleInputChange}
          showModal={this.showModal}
          labelName='New List Name:'
          name='Create New List'
          addNewList={this.addNewList} />)}

      </div>
    )
  }
}
const CustomCard = props => {
  return (
    <div className="Card">
      <header className="card-header">
        <div className='title'>{props.title}</div>
        <div className='time'>{props.label}</div>
      </header>
      <div className='Description'>
        <div >
          {props.description}
        </div>
      </div>
      <div className='Participans '>
        <div className="User Small">
          <p>YK</p>
        </div>
      </div>
    </div>
  )
}
