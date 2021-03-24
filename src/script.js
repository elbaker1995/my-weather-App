let now = new Date();
let h3 = document.querySelector("h3");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

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
let month = months[now.getMonth()];
h3.innerHTML = `${hours}:${minutes} ${date}${month}${year}  `;

function search(city) {
  let apiKey = "d12bd95cd8fc2d137ab72261317f84d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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

function sydButton(response) {
  let sydTemperature = Math.round(response.data.main.temp);
  let sydTemperatureElement = document.querySelector("#sydTemp");
  sydTemperatureElement.innerHTML = `${sydTemperature}°`;
}

let apiSyd = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&units=metric&appid=d12bd95cd8fc2d137ab72261317f84d8`;
axios.get(apiSyd).then(sydButton);

function changeToSydney() {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Sydney`;
  defaultCity("Sydney");
}

// tokyo

function tyoButton(response) {
  let tyoTemperature = Math.round(response.data.main.temp);
  let tyoTemperatureElement = document.querySelector("#tyoTemp");
  tyoTemperatureElement.innerHTML = `${tyoTemperature}°`;
}

let apiTyo = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=d12bd95cd8fc2d137ab72261317f84d8`;
axios.get(apiTyo).then(tyoButton);

function changeToTokyo() {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Tokyo`;
  defaultCity("Tokyo");
}

// london

function lndButton(response) {
  let lndTemperature = Math.round(response.data.main.temp);
  let lndTemperatureElement = document.querySelector("#lndTemp");
  lndTemperatureElement.innerHTML = `${lndTemperature}°`;
}

let apiLnd = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=d12bd95cd8fc2d137ab72261317f84d8`;
axios.get(apiLnd).then(lndButton);

function changeToLondon() {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `London`;
  defaultCity("London");
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", handleSubmit);

search("London");

let sydneyButton = document.querySelector("#sydney");
sydneyButton.addEventListener("click", changeToSydney);

let tokyoButtons = document.querySelector("#tokyo");
tokyoButtons.addEventListener("click", changeToTokyo);

let londonButtons = document.querySelector("#london");
londonButtons.addEventListener("click", changeToLondon);

// function changeToCelsius(event) {
//   event.preventDefault();
//   temperatureUnits.innerHTML = ` ${defaultCity}°C`;
// }
// function changeTofahrenheit(event) {
//   event.preventDefault();
//   temperatureUnits.innerHTML = `${fahrenheit}°F`;
// }

// let unitsCelsius = document.querySelector("#celsius");
// unitsCelsius.addEventListener("click", changeToCelsius);

// let unitsFahrenheit = document.querySelector("#fahrenheit");
// unitsFahrenheit.addEventListener("click", changeTofahrenheit);

// let temperatureUnits = document.querySelector("span, #temperature");
// let fahrenheit = Math.round((defaultCity * 9) / 5 + 32);
