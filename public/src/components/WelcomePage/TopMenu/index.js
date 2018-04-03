import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css'
import './TopMenu.css'
const TopMenu = (props) => {
    return (<div>
      <nav className="Navigation">
        <ul className="conteniner">
          <li>
            <Link className="LinkStylinng singup"  to='/signup'>Sign up</Link>
          </li>
          <li>
            <Link className="LinkStylinng login" to='/login'>Login</Link>
          </li>

        </ul>
      </nav>
    </div>)
}

export default TopMenu
