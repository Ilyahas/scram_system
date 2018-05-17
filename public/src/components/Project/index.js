import React from 'react'
import { Link } from 'react-router-dom'
import { NormalModal, ModalWindow } from '../Modal';
import './Project.css'

export const BoardHeader = ({ headerName }) => (
    <div className="BoardHeader">
      <i className="custom fa fa-users" />
      <h1>{headerName}</h1>
    </div>
)

export const BoardItem = ({ boardName, toLink }) => (
  <li>
    <Link to={toLink} className="SectionItem">
      <h1>{boardName}</h1>
    </Link>
  </li>
)
export const EndItem = ({ teamChanged, teamId }) => (
  <li className="SectionItem SectionItemAdd" onClick={() => teamChanged(teamId)}>
    <i className="fa fa-plus" aria-hidden="true" />
    <p>Add new desk</p>
  </li>
)
export const BoardSection = ({header, listItems, teamId, teamChanged }) => (
  <div className="BoardSection">
    {header}
    <ul className="BoardSectionList">
      {listItems} <EndItem teamId={teamId} teamChanged = {teamChanged}/>
    </ul>
  </div>
)

export const BoardContainer = ({
  boardSectionList,
  isShowModal,
  handleInputChange,
  addNewBoard,
  showModal,
}) => (
  <div>
    {isShowModal &&
    (
      <NormalModal>
        <ModalWindow labelName="New List Name:"
        name="Create New Board"
        addNewList={addNewBoard}
        showModal={showModal}>
        <label htmlFor="usr">New Board Name:</label>
        <input type="text" className="form-control" id="usr" onChange={handleInputChange} />
        </ModalWindow>
      </NormalModal>
    )}
    <div className="BoardContainer">{boardSectionList}</div>
  </div>
)
