import React from 'react'
import { Link } from 'react-router-dom'
import { fadeInDown } from 'react-animations'
import Radium, {StyleRoot} from 'radium';

import "../style.scss"
import "./Main.css"

const styles = {
    fadeInDown: {
        animation: 'x 1.5s',
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    }
}



const MainBlock = (props) => {
  return (
    <div>
        <StyleRoot>
        <div className="bg-intro-img"></div>
        <div className="intro">
            <div className="conteniner main-title">
                <div>
                    <div className="title" style={styles.fadeInDown}>The Scram Master</div>
                    <div className="subTitle">A development platform which lets you work more collaboratively</div>
                    <Link className="LinkStylinng singup" to='/signup'>Sign UP for Free</Link>
                </div>
            </div>
        </div>
        </StyleRoot>
    </div>
  )
}
export default MainBlock
