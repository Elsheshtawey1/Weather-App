const apiKey = "e1de5eb1d7a4c589fae5a667f8560aa4";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" +
  apiKey;

let card = document.querySelector(".card");
const searchBox = document.querySelector("#city-name");
const searchBtn = document.querySelector("#search-button");
const weatherIcon = document.querySelector("#weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}`);
  const data = await response.json();

  // If the city is valid
  if (data.cod === 200) {
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

    const weatherCondition = data.weather[0].main.toLowerCase(); // Convert to lowercase for easier matching

    // Set the correct weather icon based on the condition
    if (weatherCondition === "clouds") {
      weatherIcon.src = "images/clouds.png";
      card.style.background = "linear-gradient(135deg, #B0C6D3, #A3B9C6)"; // Change background color for clouds
    } else if (weatherCondition === "rain") {
      weatherIcon.src = "images/rain.png";
      card.style.background = "linear-gradient(135deg, #4A4A6F, #6C7A89)"; // Change background color for rain
    } else if (weatherCondition === "clear") {
      weatherIcon.src = "images/clear.png";
      card.style.background = "linear-gradient(95deg, #FFD700, #FF6347)"; // Change background color for clear
    } else if (weatherCondition === "drizzle") {
      weatherIcon.src = "images/drizzle.png";
      card.style.background = "linear-gradient(135deg, #A1C4D8, #C2E9FB)"; // Change background color for drizzle
    } else if (weatherCondition === "mist") {
      weatherIcon.src = "images/mist.png";
      card.style.background = "linear-gradient(135deg, #B0B8C1, #D1D7DC)"; // Change background color for mist
    } else {
      weatherIcon.src = "images/default.png"; // Fallback image if condition doesn't match
      card.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)"; // Default background color
    }
  } else {
    alert("City not found, please try again.");
  }
}

// Check weather on Enter key press
searchBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) {
      checkWeather(city);
    } else {
      alert("Please enter a city name.");
    }
  }
});

// Check weather on search button click
searchBtn.addEventListener("click", function () {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
