import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Board from '../../../components/Board'
import { getDashboard, lane, card, deleteCard, moveCard } from '../../../actions/dashboard'

export class BoardPage extends React.Component {
  state = {
    isShowModal: false,
    value: '',
    nextData: {},
  }
  componentDidMount() {
    const { teamName } = this.props.match.params
    this.props.getDashboard(teamName)
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.lanes, nextProps.lanes)
  }
  handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
  }
  setEventBus = (eventBus) => {
    this.setState({ eventBus })
  }
  shouldReceiveNewData = (nextData) => {
    this.setState({ nextData })
  }
  handleCardAdd = (cardBody, laneId) => {
    this.props.card(laneId, cardBody)
  }
  handleCardDelete = (cardId) => {
    this.props.deleteCard(cardId)
  }
  addNewList = () => {
    const newLane = {
      title: `${this.state.value}`,
    }
    const { teamName } = this.props.match.params
    this.props.lane(teamName, newLane)
    this.setState({ isShowModal: false })
  }
  showModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }
  handleInputChange = (event) => {
    this.setState({ value: event.target.value })
  }
  handleDragEnd = (cardId, sourceLaneId, targetLaneId, position) => {
    const moveObj = {}
    if (position !== 0) {
      const searchablelane = this.state.nextData.lanes.find(item => item.id === targetLaneId)
      const indexBefore = searchablelane.cards.findIndex(item => item.id === cardId) - 1
      moveObj.prevId = searchablelane.cards[indexBefore].id
    }
    moveObj.currentId = cardId
    this.props.moveCard(targetLaneId, moveObj)
  }
  render() {
    return (
      <Board
        boardData={this.props.lanes}
        handleCardAdd={this.handleCardAdd}
        handleCardDelete={this.handleCardDelete}
        shouldReceiveNewData={this.shouldReceiveNewData}
        setEventBus={this.setEventBus}
        handleDragStart={this.handleDragStart}
        handleDragEnd={this.handleDragEnd}
        value={this.state.value}
        isShowModal={this.state.isShowModal}
        handleInputChange={this.handleInputChange}
        showModal={this.showModal}
        lanes = {this.props.lanes}
        addNewList={this.addNewList}
        isRequested={this.props.isRequested}
      />
    )
  }
}

const mapDispatchToProps = {
  getDashboard,
  lane,
  card,
  deleteCard,
  moveCard,
}
const mapStateToProps = state => ({
  lanes: state.dashboard.lanes,
  isRequested: state.lane.isRequested,
})
BoardPage.propTypes = {
  getDashboard: PropTypes.func.isRequired,
  lane: PropTypes.func.isRequired,
  lanes: PropTypes.array.isRequired,
  isRequested: PropTypes.bool.isRequired,
  card: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)
