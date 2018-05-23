import React from 'react'
import './Home.css'
import '../Teams/Teams.css'

export default () => (
  <div className="backClr">
    <div className="SetupContainer">
      <h1>Setup Guide</h1>
      <div className="SetupGuide">
        <a className="BoxItem" href="https://www.youtube.com/watch?v=2uFA3f74D0Q">
          <i class="fa fa-youtube" aria-hidden="true" />
          <p>Scrum</p>
        </a>
        <a className="BoxItem" href="https://reqtest.com/agile-blog/7-books-every-scrum-master-should-read/">
          <i class="fa fa-book" aria-hidden="true" />
          <p>Book</p>
        </a>
        <a className="BoxItem" href="http://www.zgia.zp.ua/">
          <i class="fa fa-user" aria-hidden="true" />
          <p>Sponsors</p>
        </a>
        <a className="BoxItem" href="https://prostocoin.com/c/bitcoin">
          <i class="fa fa-money" aria-hidden="true" />
          <p>Donate</p>
        </a>
      </div>
    </div>
    {/* <div className="FlexContainer OverrideCont">
      <div className="TeamItem">My Cards</div>
      <div className="TeamItem">My Workspaces</div>
      <div className="TeamItem">My Workspaces in progress</div>
      <div className="TeamItem">Completed work history</div>
    </div> */}
  </div>
)
