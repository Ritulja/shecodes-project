function currentDay(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(formatDate) {
  let date = new Date(formatDate * 1000);
  let day = date.getDay();
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 1) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2 days">
                <div class="weather-forecast-day">${formatDay(
                  forecastDay.dt
                )}</div>
                <div class="img">
                 <img src="http://openweathermap.org/img/wn/${
                   forecastDay.weather[0].icon
                 }@2x.png" alt="icon">
                </div>
                <div class="weather-forecast-max-temp">${Math.round(
                  forecastDay.temp.max
                )}º</div>
               
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function displayCoordinates(coordinates) {
  let apiKey = "2881e3d61ec2ba64d89fe66a778a8135";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function displayWeatherCondition(response) {
  let cityDisplay = document.querySelector("#city");
  let degreeElement = document.querySelector("#current-degree");
  let stateElement = document.querySelector("#current-state");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  celsiusTemp = response.data.main.temp;
  cityDisplay.innerHTML = response.data.name;
  degreeElement.innerHTML = Math.round(celsiusTemp);
  stateElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  displayCoordinates(response.data.coord);
}
function searchCity(city) {
  let apiKey = "2881e3d61ec2ba64d89fe66a778a8135";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function cityDisplay(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city-form");
  searchCity(city.value);
}
function searchCity(city) {
  let apiKey = "2881e3d61ec2ba64d89fe66a778a8135";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayFahrenheitTemp(event) {
  event.preventDefault;
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove(".active");
  fahrenheitLink.classList.add(".active");
  let tempElement = document.querySelector("#current-degree");

  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
let celsiusTemp = null;
function searchLocation(position) {
  let apiKey = "2881e3d61ec2ba64d89fe66a778a8135";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayCelsiusTemp(event) {
  event.preventDefault;
  celsiusLink.classList.add(".active");
  fahrenheitLink.classList.remove(".active");
  let degreeElement = document.querySelector("#current-degree");

  degreeElement.innerHTML = Math.round(celsiusTemp);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = currentDay(currentTime);

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", cityDisplay);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fah-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("London");
