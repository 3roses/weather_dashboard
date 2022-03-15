

var APIKey = '374ac0965c45f86242359bb6f111043b'
var city = 'Dallas'
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;



// Dynamically creates weather information for current day

var date = moment().format('l')
console.log (date)

var main = document.getElementById('mainDiv')
main.classList.add('container', 'col-9', 'outline')

var title = document.createElement('h3')
title.textContent = `${city} ${date}`
title.classList.add('h3')

var weatherDetails = document.createElement('ul')

main.appendChild(title)
main.appendChild(weatherDetails)

//TODO create cards dynamically

//moment js variables for each five days in future
//create one card and test
//create all five in a for loop
//read api docs and see how to access future weather




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
    listItemTemp.classList.add('li')
    weatherDetails.appendChild(listItemTemp)

    var tempLow = data.main.temp_min    
    var listItemLo = document.createElement('li')
    listItemLo.textContent = `24hr Low: ${tempLow}`
    listItemLo.classList.add('li')
    weatherDetails.appendChild(listItemLo)

    var tempHigh = data.main.temp_max
    var listItemHigh = document.createElement('li')
    listItemHigh.textContent = `24hr High: ${tempHigh}`
    listItemHigh.classList.add('li')
    weatherDetails.appendChild(listItemHigh)
    
    var windSpeed = data.wind.speed
    var listItemWind = document.createElement('li')
    listItemWind.textContent = `Wind speed: ${windSpeed} MPH`
    listItemWind.classList.add('li')
    weatherDetails.appendChild(listItemWind)

    var humidity = data.main.humidity
    var listItemHumid = document.createElement('li')
    listItemHumid.textContent = `Humidity: ${humidity}%`
    listItemHumid.classList.add('li')
    weatherDetails.appendChild(listItemHumid)
  });


