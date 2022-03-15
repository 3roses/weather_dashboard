

var APIKey = '374ac0965c45f86242359bb6f111043b'
var city = 'Dallas'
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;




var weatherDetails = document.getElementById('weatherAttributes')






fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    console.log(data.wind.speed)

    var temp = data.main.temp
    var listItemTemp = document.createElement('li')
    listItemTemp.textContent = `Current Temperature: ${temp}`
    weatherDetails.appendChild(listItemTemp)

    var tempLow = data.main.temp_min    
    var listItemLo = document.createElement('li')
    listItemLo.textContent = `24hr Low: ${tempLow}`
    weatherDetails.appendChild(listItemLo)

    var tempHigh = data.main.temp_max
    var listItemHigh = document.createElement('li')
    listItemHigh.textContent = `24hr High: ${tempHigh}`
    weatherDetails.appendChild(listItemHigh)
    
    var windSpeed = data.wind.speed
    var listItemWind = document.createElement('li')
    listItemWind.textContent = `Wind speed: ${windSpeed} MPH`
    weatherDetails.appendChild(listItemWind)

    var humidity = data.main.humidity
    var listItemHumid = document.createElement('li')
    listItemHumid.textContent = `Humidity: ${humidity}%`
    weatherDetails.appendChild(listItemHumid)
  });


