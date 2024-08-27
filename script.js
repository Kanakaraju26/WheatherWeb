// script.js

document.getElementById('cityInput').addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const suggestionsContainer = document.getElementById('suggestions');
    
    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    if (input) {
        // Filter city names based on input
        const filteredCities = cities.filter(city => city.toLowerCase().startsWith(input));

        // Display suggestions
        filteredCities.forEach(city => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerText = city;

            // Handle click on suggestion
            suggestionItem.addEventListener('click', function() {
                document.getElementById('cityInput').value = city;
                suggestionsContainer.innerHTML = ''; // Clear suggestions
            });

            suggestionsContainer.appendChild(suggestionItem);
        });
    }
});


document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const cityName = document.getElementById('cityInput').value;
    console.log(cityName);
    
    if (cityName === '') {
        alert('Please enter a city name.');
        return;
    }

    const url = `https://open-weather13.p.rapidapi.com/city/${encodeURIComponent(cityName)}/EN`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a9609d21d8msh41b88cddc62daa4p1c2f9djsn0d2dca60a551',
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    fetch(url,options)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
         console.log(data);
    })
    .catch(error => console.error('Error fetching weather data:', error));
});

function displayWeather(data) {
    document.getElementById('weatherInfo').classList.remove('hidden');
    
    document.getElementById('cityName').innerText = document.getElementById('cityInput').value;;
    document.getElementById('countryName').innerText = `Country: ${data.sys.country}`;
    document.getElementById('temperature').innerText = `${convertToCelsius(data.main.temp)}°C`;
    document.getElementById('feelsLike').innerText = `Feels Like: ${data.main.feels_like}°F`;
    document.getElementById('condition').innerText = `Condition: ${data.weather[0].description}`;
    document.getElementById('visibility').innerText = `Visibility: ${data.visibility} m`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('pressure').innerText = `Pressure: ${data.main.pressure} hPa`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('windGust').innerText = `Wind Gust: ${data.wind.gust} m/s`;
    document.getElementById('windDirection').innerText = `Direction: ${data.wind.deg}°`;
    document.getElementById('cloudCover').innerText = `Cloud Cover: ${data.clouds.all}%`;
    document.getElementById('sunrise').innerText = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    document.getElementById('sunset').innerText = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
}

function convertToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5 / 9).toFixed(2); 
}