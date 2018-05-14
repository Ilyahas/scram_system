import React from 'react'
import './Project.css'

export default () => (
  <div className="BoardContainer">
    <div className="BoardSection">
      <div className="BoardHeader">
        <i className="custom fa fa-users" />
        <h>teamname</h>
      </div>
      <ul className="BoardSectionList">
        <li>
          <a className="SectionItem">
            <h>boardName</h>
          </a>
        </li>
        <li>
          <a className="SectionItem">
            <h>boardName</h>
          </a>
        </li>
        <li>
          <a className="SectionItem SectionItemAdd">
            <i className="fa fa-plus" aria-hidden="true" />
            <p>Add new desk</p>
          </a>
        </li>
      </ul>
    </div>
    <div className="BoardSection">
      <div className="BoardHeader">
        <i className="custom fa fa-users" />
        <h>teamname</h>
      </div>
      <ul className="BoardSectionList">
        <li>
          <a className="SectionItem">
            <h>boardName</h>
          </a>
        </li>
        <li>
          <a className="SectionItem">
            <h>boardName</h>
          </a>
        </li>
        <li>
          <a className="SectionItem SectionItemAdd">
            <i className="fa fa-plus" aria-hidden="true" />
            <p>Add new desk</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
)
