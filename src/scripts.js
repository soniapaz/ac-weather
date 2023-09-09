//Initial layout
function showSearchResult(response) {
  let initialTemp = document.querySelector("#current-temp");
  initialTemp.innerHTML = `${Math.round(response.data.main.temp)} ºC`;

  let initialLocation = document.querySelector("#current-city");
  initialLocation.innerHTML = response.data.name;

  let initialConditions = document.querySelector("#current-weather-text");
  initialConditions.innerHTML = response.data.weather[0].main;

  let initialHumidity = document.querySelector("#current-humidity");
  initialHumidity.innerHTML = `${response.data.main.humidity} %`;

  let initialWind = document.querySelector("#current-wind");
  initialWind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  let initialFeelsLike = document.querySelector("#current-feels-like");
  initialFeelsLike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )} ºC`;

  let initialMaxTemp = document.querySelector("#current-max-temp");
  initialMaxTemp.innerHTML = `Max.: ${Math.round(
    response.data.main.temp_max
  )} ºC ↑`;

  let initialMinTemp = document.querySelector("#current-min-temp");
  initialMinTemp.innerHTML = `Min.: ${Math.round(
    response.data.main.temp_min
  )} ºC ↓`;

  audioPause(); //To reset music button when searching for a new location

  let tempSymbol = document.querySelector(".fahrenheit-symbol"); //To reset conversion button when searching for a new location
  if (tempSymbol.innerHTML === "ºC") {
    changeTempType();
  }

  //Initial weather icon
  let initialWeatherIcon = document.querySelector("#current-weather-icon");
  let hourNow = showLocalDateAndHour(response);

  if (initialConditions.textContent === "Thunderstorm") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-bolt");
  } else if (initialConditions.textContent === "Drizzle") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-cloud-rain");
  } else if (initialConditions.textContent === "Rain") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-cloud-showers-heavy");
  } else if (initialConditions.textContent === "Snow") {
    initialWeatherIcon.setAttribute("class", "fa-regular fa-snowflake");
  } else if (initialConditions.textContent === "Mist") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-smog");
  } else if (initialConditions.textContent === "Smoke") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-smog");
  } else if (initialConditions.textContent === "Haze") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-smog");
  } else if (initialConditions.textContent === "Dust") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-smog");
  } else if (initialConditions.textContent === "Fog") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-smog");
  } else if (initialConditions.textContent === "Sand") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-smog");
  } else if (initialConditions.textContent === "Ash") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-smog");
  } else if (initialConditions.textContent === "Squall") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-wind");
  } else if (initialConditions.textContent === "Tornado") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-tornado");
  } else if (initialConditions.textContent === "Clear") {
    if (hourNow >= 21 || hourNow < 6) {
      initialWeatherIcon.setAttribute("class", "fa-solid fa-moon");
    } else {
      initialWeatherIcon.setAttribute("class", "fa-solid fa-sun");
    }
  } else if (initialConditions.textContent === "Clouds") {
    initialWeatherIcon.setAttribute("class", "fa-solid fa-cloud");
  }

  //Change of music track depending on the parts of the day
  let audioHTMLSelector = document.querySelector("#audio");

  if (hourNow >= 21 || hourNow < 6) {
    audioHTMLSelector.setAttribute(
      "src",
      "https://audio.jukehost.co.uk/P079LVYjwprIupeNpCRW0CrFzZYU60KW"
    ); //night
  } else if (hourNow >= 6 && hourNow < 12) {
    audioHTMLSelector.setAttribute(
      "src",
      "https://audio.jukehost.co.uk/3TzpVF4v4y5wdWThMKD3FCCVVS7oQQae"
    ); //morning
  } else if (hourNow >= 12 && hourNow < 13) {
    audioHTMLSelector.setAttribute(
      "src",
      "https://audio.jukehost.co.uk/JNrrMdpABExr5kNeMDrGbTXQ82ZPNdMV"
    ); //noon
  } else if (hourNow >= 13 && hourNow < 17) {
    audioHTMLSelector.setAttribute(
      "src",
      "https://audio.jukehost.co.uk/QeMcZD4Axh76BZWaUtZkWNhykbEJTmBI"
    ); //afternoon
  } else if (hourNow >= 17 && hourNow < 21) {
    audioHTMLSelector.setAttribute(
      "src",
      "https://audio.jukehost.co.uk/AD4k3WmtONihvYMSA2oHgqTWFGLfzHk8"
    ); //evening
  }

  //Runs the five-day forecast
  getForecast(response.data.coord);
}

let apiKey = "b4966aaefe805e530bcf3948c7f52bbe";
let initialLocation = "Málaga";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${initialLocation}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showSearchResult);

//Current local date and hour
function showLocalDateAndHour(response) {
  let currentDate = document.querySelector("#current-local-date");
  let currentTime = document.querySelector("#current-local-hour");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let timeNow = new Date();
  let cityInfo = response.data;
  let timezone = cityInfo.timezone;
  let localTime = timeNow.getTime();
  let localOffset = timeNow.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let cityDateCode = utc + 1000 * timezone;
  let cityDate = new Date(cityDateCode);
  let dayNow = days[cityDate.getDay()];
  let monthNow = months[cityDate.getMonth()];
  let dateNow = cityDate.getDate();
  let hourNow = cityDate.getHours();
  hourNow = ("0" + hourNow).slice(-2); //or if (hourNow < 10) {hours = `0${hourNow}`;}
  let minutesNow = timeNow.getMinutes();
  minutesNow = ("0" + minutesNow).slice(-2); //or if (minutesNow < 10) {hours = `0${minutesNow}`;}

  currentDate.innerHTML = `${dayNow}, ${monthNow} ${dateNow}`;
  currentTime.innerHTML = `${hourNow}:${minutesNow}`;

  return hourNow;
}

//Search engine
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  if (searchInput.value === "") {
    return;
  }

  let h2 = document.querySelector("#current-city");
  let apiKey = "b4966aaefe805e530bcf3948c7f52bbe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  if (
    !axios.get(apiUrl).catch((error) => {
      swal.fire({
        //Resetti alert for invalid location
        imageUrl: "/images/resetti-icon.png",
        title: "...WHAT WAS THAT?!",
        html: "Before hitting the search button, type in a VALID location! Type in a VALID one! <br> I KNOW you knew that. <br> <br> YA HEAR ME? <br> <br> <strong>NOW, SCRAM!</strong>",
        confirmButtonText: "Okay...",
        confirmButtonColor: "#6bb888",
        width: 400,
        height: 300,
        allowOutsideClick: false,
      });
    })
  ) {
    h2.innerHTML = `${searchInput.value}`;
  }
  axios.get(apiUrl).then(showSearchResult);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let buttonSearch = document.querySelector("#search-button");
buttonSearch.addEventListener("click", searchCity);

//Current location button
function showCurrentCity(response) {
  let currentCity = response.data.name;
  let h2 = document.querySelector("#current-city");
  h2.innerHTML = currentCity;
}

function setCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b4966aaefe805e530bcf3948c7f52bbe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchResult);
}

function readCurrentLocation() {
  navigator.geolocation.getCurrentPosition(setCurrentLocation);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", readCurrentLocation);

//Main Celsius to Fahrenheit conversion (included maximum temperature, minimum temperature and feels like temperature conversion)
function showTempInFahrenheit(response) {
  let showFahrenheit = Math.round(response.data.main.temp);
  let initialTemp = document.querySelector("#current-temp");
  initialTemp.innerHTML = `${showFahrenheit} ºF`;

  let showFeelsLikeInFahrenheit = Math.round(response.data.main.feels_like);
  let initialFeelsLike = document.querySelector("#current-feels-like");
  initialFeelsLike.innerHTML = `Feels like ${showFeelsLikeInFahrenheit} ºF`;

  let showMaxTempInFahrenheit = Math.round(response.data.main.temp_max);
  let initialMaxTemp = document.querySelector("#current-max-temp");
  initialMaxTemp.innerHTML = `Max.: ${showMaxTempInFahrenheit} ºF ↑`;

  let showMinTempInFahrenheit = Math.round(response.data.main.temp_min);
  let initialMinTemp = document.querySelector("#current-min-temp");
  initialMinTemp.innerHTML = `Min.: ${showMinTempInFahrenheit} ºF ↓`;

  let showSpeedInMiles = Math.round(response.data.wind.speed * 0.621371);
  let initialWindSpeed = document.querySelector("#current-wind");
  initialWindSpeed.innerHTML = `${showSpeedInMiles} mph`;

  getForecast(response.data.coord); // Change five-day forecast to Fahrenheit
}

function showTempInCelsius(response) {
  let showCelsius = Math.round(response.data.main.temp);
  let initialTemp = document.querySelector("#current-temp");
  initialTemp.innerHTML = `${showCelsius} ºC`;

  let showFeelsLikeInCelsius = Math.round(response.data.main.feels_like);
  let initialFeelsLike = document.querySelector("#current-feels-like");
  initialFeelsLike.innerHTML = `Feels like ${showFeelsLikeInCelsius} ºC`;

  let showMaxTempInCelsius = Math.round(response.data.main.temp_max);
  let initialMaxTemp = document.querySelector("#current-max-temp");
  initialMaxTemp.innerHTML = `Max.: ${showMaxTempInCelsius} ºC ↑`;

  let showMinTempInCelsius = Math.round(response.data.main.temp_min);
  let initialMinTemp = document.querySelector("#current-min-temp");
  initialMinTemp.innerHTML = `Min.: ${showMinTempInCelsius} ºC ↓`;

  let showSpeedInKilometers = Math.round(response.data.wind.speed);
  let initialWindSpeed = document.querySelector("#current-wind");
  initialWindSpeed.innerHTML = `${showSpeedInKilometers} km/h`;

  getForecast(response.data.coord); // Change five-day forecast to Celsius
}

function changeTempType() {
  let apiKey = "b4966aaefe805e530bcf3948c7f52bbe";
  let initialLocation = document.querySelector("#current-city").textContent;
  let tempSymbol = document.querySelector(".fahrenheit-symbol");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${initialLocation}&appid=${apiKey}&units=imperial`;
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${initialLocation}&appid=${apiKey}&units=metric`;

  //Fahrenheit to Celsius toggle button
  if (tempSymbol.innerHTML === "ºF") {
    axios.get(apiUrl).then(showTempInFahrenheit);
    tempSymbol.innerHTML = "ºC";
  } else if (tempSymbol.innerHTML === "ºC") {
    axios.get(apiUrl2).then(showTempInCelsius);
    tempSymbol.innerHTML = "ºF";
  }
}

let changeTemp = document.querySelector("#fahrenheit-celsius-button");
changeTemp.addEventListener("click", changeTempType);

//Music button
let isPlaying = false;

function audioPlay() {
  let audioElement = document.querySelector("#audio");
  let iconElement = document.querySelector("#play-pause-button > i");

  audioElement.play();
  isPlaying = true;
  iconElement.classList.replace("fa-play", "fa-pause");
}

function audioPause() {
  let audioElement = document.querySelector("#audio");
  let iconElement = document.querySelector("#play-pause-button > i");

  audioElement.pause();
  isPlaying = false;
  iconElement.classList.replace("fa-pause", "fa-play");
}

let playPauseButton = document.querySelector("#play-pause-button");

function audioPlayPause() {
  if (isPlaying) {
    audioPause();
  } else {
    audioPlay();
  }
}

playPauseButton.addEventListener("click", audioPlayPause);

//Five-day forecast
function showForecastDayName(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let fiveDayForecast = document.querySelector("#forecast");

  let forecastHTML =
    '<div class="row ps-1 ps-md-0 pe-1 pe-md-0 justify-content-evenly justify-content-md-between">';
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let addProperIcon = ``;
      let forecastIcon = forecastDay.weather[0].main;
      if (forecastIcon === "Drizzle") {
        addProperIcon = "fa-solid fa-cloud-rain";
      } else if (forecastIcon === "Rain") {
        addProperIcon = "fa-solid fa-cloud-showers-heavy";
      } else if (forecastIcon === "Snow") {
        addProperIcon = "fa-regular fa-snowflake";
      } else if (forecastIcon === "Mist") {
        addProperIcon = "fa-solid fa-smog";
      } else if (forecastIcon === "Smoke") {
        addProperIcon = "fa-solid fa-smog";
      } else if (forecastIcon === "Haze") {
        addProperIcon = "fa-solid fa-smog";
      } else if (forecastIcon === "Dust") {
        addProperIcon = "fa-solid fa-smog";
      } else if (forecastIcon === "Fog") {
        addProperIcon = "fa-solid fa-smog";
      } else if (forecastIcon === "Sand") {
        addProperIcon = "fa-solid fa-smog";
      } else if (forecastIcon === "Ash") {
        addProperIcon = "fa-solid fa-smog";
      } else if (forecastIcon === "Squall") {
        addProperIcon = "fa-solid fa-wind";
      } else if (forecastIcon === "Tornado") {
        addProperIcon = "fa-solid fa-tornado";
      } else if (forecastIcon === "Clear") {
        addProperIcon = "fa-solid fa-sun";
      } else if (forecastIcon === "Clouds") {
        addProperIcon = "fa-solid fa-cloud";
      }

      forecastHTML =
        forecastHTML +
        `
      <div id="forecast-day-${index + 1}" class="col-5 col-md-2">
            <div class="row">
              <p>${showForecastDayName(forecastDay.dt)}</p>
            </div>
            <div id="forecast-day" class="row">
              <i id="thu-icon" class="${addProperIcon}"></i>
              <span id="thu-forecast">${Math.round(
                forecastDay.temp.max
              )} º |&nbsp ${Math.round(forecastDay.temp.min)} º</span>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + "</div>";
  fiveDayForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "62a816282d3b51b7451838a6b7b63934";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  let tempSymbol = document.querySelector(".fahrenheit-symbol");
  if (tempSymbol.innerHTML === "ºC") {
    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  }
  axios.get(apiUrl).then(showForecast);
}
