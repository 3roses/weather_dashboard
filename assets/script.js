// GLOBAL VARIABLES
var APIKey = '374ac0965c45f86242359bb6f111043b'

const submitBtn = document.querySelector('button')
const formInput = document.querySelector('#userCity')
var formElement = document.querySelector('#cityForm')
var city;
var weatherDetails;
var lat;
var lon;
var main = document.getElementById('mainDiv')


// Dynamically creates weather information for current day
function mainWeather (){

    var date = moment().format('l')
    console.log (date)

    

    var title = document.createElement('h3')
    title.innerHTML = city + " " + date
    title.classList.add('h3')

    weatherDetails = document.createElement('ul')

    main.appendChild(title)
    main.appendChild(weatherDetails)
}






//TODO create cards dynamically
//moment js variables for each five days in future
//create one card and test
//create all five in a for loop
//read api docs and see how to access future weather

//put this in the fetch function??? probably so




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
        
            var cards = document.getElementById('cardDiv')
            var  cardStyle = document.createElement('div') //created each card div
            cardStyle.classList.add('card', 'col', 'cardDiv')
        
            var cardContent = document.createElement('div')  //creates div for content
            cardContent.classList.add('card-body', 'cardStyle')  
        
            var cardHeader = document.createElement('h5') //creates card header
            cardHeader.textContent = dayCard
            
            var cardUl = document.createElement('ul')  //card ul
            cardUl.classList.add('left')
        
            var cardWeather1 = document.createElement('li') //card li
            cardWeather1.textContent = `Temp: ${dailyTemp}`

            var cardWeather2 = document.createElement('li')
            cardWeather2.textContent = `Wind Speed: ${dailyWind} MPH`

            var cardWeather3 = document.createElement('li')
            cardWeather3.textContent = `Humidity: ${humidity}%`

            main.appendChild(cardDiv)
            cardDiv.appendChild(cardContent)
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
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;  // concatenate city desired onto the query url string along with apikey
  console.log(queryURL);
  mainWeather()
  weatherRequester(queryURL);   //we need to make the fetch request for the data
  
})


// function renderCurrentWeather(currentWeather) {
//   console.log(currentWeather);
//   return `
//   <li>Current Temperature: ${currentWeather.temp}</li>`;
// }


// save city variable to local storage as array

  // get current local storage as array (json parse)

  // unshift push ---whatever method you want for this application-- the data into array
  // set array as new localstorage (json stringify)


//.unshift() most recent city into the array
//display these cities as buttons in the ul under the input field
//0 index first
//put this function in the click of the submit button



/* 
addthings(32, 5)

function addThings (x, y) {
  return x + y;
  go to global variable and grab values-->
}

*/