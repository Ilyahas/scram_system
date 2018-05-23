import React from 'react'
import './Settings.css'

export default ({
  name, additionalInf, description, btnName, list,
}) => (
  <div>
    <div className="SettingsHeader">
      <div className="PaneHeader">
        <div className="BcgCircle">
          <i className="fa fa-users" aria-hidden="true" />
        </div>
        <div className="CurrentDetails">
          <h1>{name}</h1>
          <label>{additionalInf}</label>
          <p> {description}</p>
          {/* <button className="btn"> {btnName}</button> */}
        </div>
      </div>
    </div>
    <div className="NavPane">
      <ul>
        {list}
        {/* <li>
            <a className="ActiveSettings">asasas</a>
          </li>
          <li>
            <a>asasas</a>
          </li>
          <li>
            <a>asasa</a>
          </li> */}
      </ul>
    </div>
  </div>
)
