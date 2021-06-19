
export const getDateObj = (newDate=undefined) => {
  // Returns dateObj, an Object containing a date in various forms
  const date = newDate ? new Date(newDate) : new Date()   // create a `newDate(newDate)`, or create a `new Date()`
  const dateDisplay = date.toDateString().substr(0, date.toDateString().length - 5)
  const dateUniform = date.toLocaleDateString().substr(0,10).split('/').join('-')
  const dateObj = {
    date,          // 2021-04-09T20:14:01.042Z
    dateUniform,   // 04-09-21
    dateDisplay,   // Fri Apr 9
  }

  return dateObj
}

export const getWeatherObj = (weather) => {
  // Returns necessary data from API response
  const weatherObj = {
    "temp": Math.floor((weather.main.temp - 273) * (9/5) + 32), // convert Kelvin to F
    "desc": weather.weather[0].main 
  }
  return weatherObj
}