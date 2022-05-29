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

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-state").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function searchCity(city) {
  let apiKey = "2881e3d61ec2ba64d89fe66a778a8135";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function cityDisplay(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city-form").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "2881e3d61ec2ba64d89fe66a778a8135";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function changeToFaren(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-degree");
  currentDegree.innerHTML = 65;
}

function changeToCelcius(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-degree");
  currentDegree.innerHTML = 18;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = currentDay(currentTime);

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", cityDisplay);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");