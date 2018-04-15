import React from 'react'
import Board from 'react-trello'
import './Board.css'
const data = require('./data.json')
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
  state = { boardData: { lanes: [] } }

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

  render() {
    return (
      <div>
        <Board
          editable
          onCardAdd={this.handleCardAdd}
          data={this.state.boardData}
          draggable
          onDataChange={this.shouldReceiveNewData}
          eventBusHandle={this.setEventBus}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
        <div className="Sidenav">
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a></div>
      </div>
    )
  }
}
