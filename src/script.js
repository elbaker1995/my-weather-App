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
