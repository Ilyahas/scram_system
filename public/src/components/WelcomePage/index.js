import React from 'react'
import PropTypes from 'prop-types'

import TopMenu from "./TopMenu"
import MainBlock from "./Main"


const MainPage = (props) => {
  return (
    <div>
        <TopMenu/>
        <MainBlock/>
    </div>
  )
}

export default MainPage
