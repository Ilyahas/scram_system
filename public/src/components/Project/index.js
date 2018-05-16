import React from 'react'
import { Link } from 'react-router-dom'
import './Project.css'

export const BoardHeader = ({ teamName }) => {
  return (
    <div className="BoardHeader">
      <i className="custom fa fa-users" />
      <h>{teamName}</h>
    </div>
  )
}

export const BoardItem = ({ boardName, toLink }) => (
  <li>
    <Link to={toLink} className="SectionItem">
      <h>{boardName}</h>
    </Link>
  </li>
)

export const BoardSection = ({ header, listItems }) => (
  <div className="BoardSection">
    {header}
    <ul className="BoardSectionList">{listItems}</ul>
  </div>
)

export const EndItem = () => (
  <li>
    <i className="fa fa-plus" aria-hidden="true" />
    <p>Add new desk</p>
  </li>
)
export const BoardContainer = ({ boardSectionList }) => <div className="BoardContainer">{boardSectionList}</div>
