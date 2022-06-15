// variables
var APIKey = "7ca476433c6847053eeda25ceac28740";
var submit = document.querySelector("#submit-btn");
var cityNameButtons = document.querySelector(".city-name-section");



// get city name from input
var citySearch = function() {
    var searchInputVal = document.getElementById("search-input").value;
    apiCall(searchInputVal);

    document.getElementById("search-input").value = "";
}

// call to api
var apiCall = function(city) {
    var api = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;

    fetch(api).then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var cityName = data[0].name;
            
    
            console.log(cityName);
            weatherCall(lat, lon);
            sideButtons(cityName);
        });
      } else {
        alert('Error: City Not Found');
      }
    })
    .catch(function(error) {
      alert("Unable to connect to API");
    });

}

// call to get weather info
var weatherCall = function(lat, lon) {
    var api = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + APIKey;
    
    fetch(api).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
}


// functions to create html 

// city name side buttons
var sideButtons = function(name) {
    var newButton = document.createElement("button");
    newButton.classList = "btn btn-secondary";
    newButton.setAttribute("type", "button");
    newButton.textContent = name;

    cityNameButtons.appendChild(newButton);
}


// function to create buttons when city is submitted


// local storage to save entries


// event listeners
submit.addEventListener('click', citySearch);