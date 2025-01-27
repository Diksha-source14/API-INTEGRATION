const apiKey = "194d8a1419b62aebe95ccf04d7a4752e";  // Replace with your OpenWeatherMap API key

const locationElem = document.getElementById("location");
const temperatureElem = document.getElementById("temperature");
const descriptionElem = document.getElementById("description");
const errorElem = document.getElementById("error-message");
const weatherContainer = document.querySelector('.weather-container');
const body = document.body;

async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        errorElem.textContent = "Please enter a city name.";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            errorElem.textContent = "City not found. Please try again.";
            weatherContainer.style.display = "none";
            body.style.backgroundImage = "";
        } else {
            errorElem.textContent = "";
            weatherContainer.style.display = "block";
            locationElem.textContent = `${data.name}, ${data.sys.country}`;
            temperatureElem.textContent = `${data.main.temp} °C`;
            descriptionElem.textContent = `Condition: ${data.weather[0].description}`;

            // Change background based on weather conditions
            setWeatherBackground(data.weather[0].main);
        }
    } catch (error) {
        errorElem.textContent = "Error fetching data. Please try again later.";
    }
}

// Change background image based on weather condition
function setWeatherBackground(weatherType) {
    switch (weatherType.toLowerCase()) {
        case 'clear':
        case 'sunny':
            body.className = 'sunny';
            break;
        case 'rain':
            body.className = 'rainy';
            break;
        case 'clouds':
            body.className = 'cloudy';
            break;
        default:
            body.className = '';
            break;
    }
}
