import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Board from '../../../components/Board'
import { getDashboard } from '../../../actions/dashboard'

export class BoardPage extends React.Component {
  state = {
    isShowModal: false,
    value: '',
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
    console.log('New card has been added')
    console.log(nextData)
  }
  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }
  addNewList = () => {
    const boardData = { ...this.state.boardData }
    boardData.lanes = [
      ...boardData.lanes,
      {
        id: `${this.state.value.toUpperCase()}`,
        title: `${this.state.value}`,
        cards: [],
      },
    ]
    this.setState({ boardData, isShowModal: false })
  }
  showModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }
  handleInputChange = (event) => {
    this.setState({ value: event.target.value })
  }
  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
  }
  render() {
    return (
      <Board
        boardData={this.props.lanes}
        handleCardAdd={this.handleCardAdd}
        shouldReceiveNewData={this.shouldReceiveNewData}
        setEventBus={this.setEventBus}
        handleDragStart={this.handleDragStart}
        handleDragEnd={this.handleDragEnd}
        value={this.state.value}
        isShowModal={this.state.isShowModal}
        showModal={this.showModal}
        lanes = {this.props.lanes}
      />
    )
  }
}

const mapDispatchToProps = {
  getDashboard,
}
const mapStateToProps = state => ({
  lanes: state.dashboard.lanes,
})
BoardPage.propTypes = {
  getDashboard: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)
