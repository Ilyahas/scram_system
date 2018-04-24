import React, { Component } from 'react'
import './Input.css'

class Input extends Component {
  render() {
    return (
      <div className="Input">
        <input
          id={this.props.name}
          autoComplete="false"
          required
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
        <label htmlFor={this.props.name} />
      </div>
    )
  }
}

export default Input
