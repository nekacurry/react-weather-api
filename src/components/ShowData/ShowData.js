  import React, { Component } from 'react'

import './ShowData.css'

export default class ShowMood extends Component {
  render() {
    return (
      <div className="show-mood-component">
        <p>{this.props.entry.date}</p>
        <p>Feeling {this.props.entry.mood.charAt(0).toUpperCase() + this.props.entry.mood.slice(1)}</p>
        <p>{this.props.entry.weather.temp}° and {this.props.entry.weather.desc}</p>
      </div>
    )
  }
}