import React, { Component } from 'react'
import './Input.css';
export class Input extends Component {
  render() {
    return (
      <div className="Input">
        <input
        id={this.props.name}
        autoComplete="false"
        required type={this.props.type}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}></input>
        <label htmlFor={this.props.name}></label>
      </div>
    )
  }
}
export default Input
