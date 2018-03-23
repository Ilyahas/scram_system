import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './TopMenu.scss'
const TopMenu = (props) => {
  return (<div>
    <nav className="Navigation">
      <ul>
        <li>
            <Link className="LinkStylinng" to='/login'>Login</Link>
        </li>
        <li>
          <Link className="LinkStylinng"  to='/signup'>Signup</Link>

        </li>
      </ul>
    </nav>
  </div>)
}

export default TopMenu
