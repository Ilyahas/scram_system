import React from 'react'
import './Members.css'

export const UserList = ({ children }) => (
  <div className="Rows">
    {children}
    {/* <div className="Role">Role</div> */}
  </div>
)

export const UserItem = ({ firstname, lastname, nickname }) => (
  <div className="UserContainer">
    <div className="Start">
      <div className="avatar">
        {firstname[0]}
        {lastname[0]}
      </div>
      <div className="UserData">
        <h2 className="username">
          {firstname} {lastname}{' '}
        </h2>
        <h2 className="TeamLead">@{nickname}</h2>
      </div>
    </div>
  </div>
)
