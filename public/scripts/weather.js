let weather = document.getElementById("weather")

function loadWeather() {
  let currentWeather= "https://api.openweathermap.org/data/2.5/weather?zip=77373&units=imperial&appid=1a58f63ba901c71f51ab6e02fdfe37e2"

  fetch(currentWeather)
  .then(response=>response.json())
    .then(weatherItems=> {
      let temp = weatherItems.main.temp
      let tempRound = Math.round(temp)
      let condition = weatherItems.weather[0].main
      let windDirection = getDirection(weatherItems.wind.deg)
      let windSpeed = weatherItems.wind.speed
      let windRound = Math.round(windSpeed)

  if (windDirection == null) {
    let houstonWeather = `<h4>Current Conditions: ${tempRound}° | ${condition} | Wind ${windRound}mph</h4>`
    weather.innerHTML = houstonWeather
  }
  else {
    let houstonWeather = `<h4>Current Conditions: ${tempRound}° | ${condition} | Wind ${windDirection} ${windRound}mph</h4>`
    weather.innerHTML = houstonWeather
  }
})
}

function getDirection(angle) {
   let directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
   return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
}

loadWeather()
