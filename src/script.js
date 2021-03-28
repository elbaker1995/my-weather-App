function formatDate(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDate();
  let year = date.getFullYear();
  let months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "NOV",
    "DEC",
  ];
  let month = months[date.getMonth()];
  return `${formatHours(timestamp)} ${day}${month}${year}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "d12bd95cd8fc2d137ab72261317f84d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayWeatherCondition);

  let forcastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${forcastApiUrl}`).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsius = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsius);
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div id="daily-forecast">
  <h4>
  ${formatHours(forecast.dt * 1000)}
  </h4>
  <img class= "forecastIcon" src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png"/>
  
  <div class="forecastTemp"><strong id="highs">${Math.round(
    forecast.main.temp_max
  )}°</strong> <span id="lows">
  ${Math.round(forecast.main.temp_min)}°</span></div></div>
  `;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  search(city);
}

function searchLocation(position) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=d12bd95cd8fc2d137ab72261317f84d8&units=metric`;
  axios.get(url).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", handleSubmit);

//sydney
function searchSydney() {
  axios.get(sydUrl).then(displayWeatherCondition);
}

function sydneyDisplay(response) {
  document.querySelector("#syd-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

let sydneyButton = document.querySelector("#sydney");
sydneyButton.addEventListener("click", searchSydney);

let sydUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&units=metric&appid=d12bd95cd8fc2d137ab72261317f84d8`;
axios.get(sydUrl).then(sydneyDisplay);

// // tokyo
function searchTokyo() {
  axios.get(tyoUrl).then(displayWeatherCondition);
}

function tokyoDisplay(response) {
  document.querySelector("#tyo-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

let tokyoButton = document.querySelector("#tokyo");
tokyoButton.addEventListener("click", searchTokyo);

let tyoUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=d12bd95cd8fc2d137ab72261317f84d8`;
axios.get(tyoUrl).then(tokyoDisplay);

// // london
function searchLondon() {
  axios.get(lndUrl).then(displayWeatherCondition);
}

function londonDisplay(response) {
  document.querySelector("#lnd-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

let londonButton = document.querySelector("#london");
londonButton.addEventListener("click", searchLondon);

let lndUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=d12bd95cd8fc2d137ab72261317f84d8`;
axios.get(lndUrl).then(londonDisplay);

search("New York");

function changeTofahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let hourlyHighsTemperatureElement = document.querySelector("#highs");
  let hourlyLowsTemperatureElement = document.querySelector("#lows");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheit = (celsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheit);
  hourlyHighsTemperatureElement.innerHTML = Math.round(fahrenheit);
  hourlyLowsTemperatureElement.innerHTML = Math.round(fahrenheit);
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let hourlyHighsTemperatureElement = document.querySelector("#highs");
  let hourlyLowsTemperatureElement = document.querySelector("#lows");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsius);
  hourlyHighsTemperatureElement.innerHTML = Math.round(celsius);
  hourlyLowsTemperatureElement.innerHTML = Math.round(celsius);
}

let celsius = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeTofahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);
