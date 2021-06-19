import React, { Component } from 'react'
import './InputData.css'
import { getDateObj, getWeatherObj } from './../../utils'

export default class InputData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zip: '',
      mood: '',
      weatherData: undefined,
    }

    this.submit = this.submit.bind(this)
    this.getAPIData = this.getAPIData.bind(this)
  }

  getAPIData(zip) {
    const key = 'ded2931ab0bcfe4f0f974e3830fccae7'
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}`
    // Fetch OpenWeatherMap Data from given zip code
    fetch(url)
      .then(res => res.json())
      .then(json => { this.setState({ weatherData: json }) })
  }

  submit() {
    const { zip, mood, weatherData } = this.state
    const { onSubmit } = this.props
    let data // controls waiting on API data, scoping
    // Get `this.state.weatherData` from API response
    this.getAPIData(zip)
    if (weatherData) {
      // if `this.state.weatherData` is defined, set entry data
      // using imported helper functions
      data = {
        "weather": getWeatherObj(weatherData),
        mood,
        "date": getDateObj().dateDisplay
      }
    }
    if (data) {
      // once data is defined, pass to parent component (App.js)
      onSubmit(data)
    }
  }

  render() {
    // Conditional rendering control for submit button
    let button = undefined
    if (this.state.zip && this.state.mood) {
      button = <button onClick={this.submit}>submit!</button>
    }

    return (
      <section id="input-mood">


        {/* Zip Code Input */}
        <label>
          <h1>where are you?</h1>
          <input
            value={this.state.zip}
            onChange={e => this.setState({ zip: e.target.value })}
            type="text"
            pattern="(\d{5}([\-]\d{4})?)"
            placeholder="my zipcode"
          />
        </label>

        {/* Mood Input */}
        <label>
          <h1>what's your mood?</h1>
          <select
            name="mood"
            value={this.state.mood}
            onChange={e => this.setState({ mood: e.target.value })}
          >
            {/* Mood Options */}
            <option value="" defaultValue disabled hidden>my mood</option>
            <option value="happy">happy</option>
            <option value="confident">confident</option>
            <option value="energized">energized</option>
            <option value="tired">tired</option>
            <option value="fine">fine</option>
            <option value="angry">angry</option>
            <option value="bored">bored</option>
            <option value="embarrassed">embarrassed</option>
            <option value="sad">sad</option>
            <option value="stressed">stressed</option>
            <option value="uncomfortable">uncomfortable</option>
          </select>
        </label>
        
        {/* Conditionally rendered submit button */}
        {button}
      </section>
    )
  }
}
