import React from 'react'
import PropTypes from 'prop-types'
import './TopMenu.scss'
const TopMenu = (props) => {
  return (<div>
    <nav className="Navigation">
      <ul>
        <li>
          <button>Login</button>
        </li>
        <li>
          <button>SignUp</button>
        </li>
      </ul>
    </nav>
  </div>)
}

export default TopMenu
