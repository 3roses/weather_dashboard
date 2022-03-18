// GLOBAL VARIABLES
var APIKey = '374ac0965c45f86242359bb6f111043b'

const submitBtn = document.querySelector('button')
const formInput = document.querySelector('#userCity')
var formElement = document.querySelector('#cityForm')
var city;
var weatherDetails;
var main = document.getElementById('mainDiv')
var cards = document.getElementById('cardDiv')
var searchedCities; 
var storageData = JSON.parse(localStorage.getItem('searchedCities'))


if (!storageData){
  searchedCities = []
}
else{
  searchedCities = storageData
}


var recent = document.getElementById('recentSearches')

for (i=0; i<searchedCities.length; i++){
  var recentList = document.createElement('li')
  recentList.textContent = searchedCities[i]
  recent.appendChild(recentList)
}



// Dynamically creates weather information for current day

function mainWeather (){

    var date = moment().format('l')
    console.log (date)

    main.innerHTML = ''              // Removes previous search result
    cards.innerHTML = ''

    var title = document.createElement('h3')
    title.innerHTML = city + " " + date
    title.classList.add('h3')

    weatherDetails = document.createElement('ul')

    main.appendChild(title)
    main.appendChild(weatherDetails)
}



// function created to take in a query url for one day api endpoint and do a fetch request and THEN build list items and append to page with data
function weatherRequester (queryURL) {

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      console.log(data)
  
      var temp = data.main.temp
      var listItemTemp = document.createElement('li')
      console.log(listItemTemp)
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

      console.log(data.coord.lon)
      console.log(data.coord.lat)

      var lon = data.coord.lon
      var lat = data.coord.lat
      var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey
  
        fetch(queryURL2)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data)
          console.log(data.daily[1].temp.day)
          console.log(data.daily[1].wind_speed)

          for(i=1; i<6; i++){

            var dayCard = moment().add(i, 'days').format('l');  //gives us next 5 days
            console.log(dayCard)

            var dailyTemp = data.daily[i].temp.day
            var dailyWind = data.daily[i].wind_speed
            var dailyHumidity = data.daily[i].humidity
        
            
            var  cardStyle = document.createElement('div') //created each card div
            cardStyle.classList.add('card', 'col', 'cardDiv')
        
            var cardContent = document.createElement('div')  //creates div for content
            cardContent.classList.add('card-body', 'cardStyle')  
        
            var cardHeader = document.createElement('h5') //creates card header
            cardHeader.textContent = dayCard
            cardHeader.classList.add('text')
            
            var cardUl = document.createElement('ul')  //card ul
            cardUl.classList.add('left')
        
            var cardWeather1 = document.createElement('li') //card li
            cardWeather1.textContent = `Temp: ${dailyTemp}`
            cardWeather1.classList.add('text')

            var cardWeather2 = document.createElement('li')
            cardWeather2.textContent = `Wind Speed: ${dailyWind} MPH`
            cardWeather2.classList.add('text')

            var cardWeather3 = document.createElement('li')
            cardWeather3.textContent = `Humidity: ${dailyHumidity}%`
            cardWeather3.classList.add('text')

            main.appendChild(cards)
            cards.appendChild(cardContent)
            cardContent.appendChild(cardHeader)
            cardContent.appendChild(cardUl)
            cardUl.appendChild(cardWeather1)
            cardUl.appendChild(cardWeather2)
            cardUl.appendChild(cardWeather3)

        }


    
          
        });
      


    });
}

// Form submission handler
formElement.addEventListener('submit', function(event) {
  event.preventDefault();

  
  city = formInput.value;     //now we want to look at the inputs on the form and store those values in a variable
  console.log(city)
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;  // concatenate city desired onto the query url string along with apikey
  console.log(queryURL);
  
  mainWeather()
  weatherRequester(queryURL);   //we need to make the fetch request for the data

  
  var recentList = document.createElement('li')    // Lists recent searches underneath the input form 
  recentList.textContent = city
  recent.appendChild(recentList)
  
  searchedCities.push(city);
  localStorage.setItem('searchedCities', JSON.stringify(searchedCities));     // Saves search to local storage
  
})
