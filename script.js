const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '4749807104msh2c14424ddf82848p15f537jsn15995971e8db',
        'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

// Function to fetch weather data
async function getweather(latitude, longitude, cityName = null) {
    try {
        if (!cityName) {
            document.getElementById("cityName").innerHTML = `Lat: ${latitude}, Lon: ${longitude}`;
        }

        const response = await fetch(`${url}lat=${latitude}&lon=${longitude}`, options);
        const result = await response.json();
        console.log(`Weather data for ${cityName || "Custom Location"}:`, result);

        if (cityName) {
            // Update weather for common cities
            document.getElementById(`${cityName}_temp`).innerHTML = result.temp;
            document.getElementById(`${cityName}_cloud`).innerHTML = result.cloud_pct;
            document.getElementById(`${cityName}_wind`).innerHTML = result.wind_speed;
            document.getElementById(`${cityName}_humidity`).innerHTML = result.humidity;
        } else {
            // Update UI for user input location
            document.getElementById("cloud_pct").innerHTML = result.cloud_pct;
            document.getElementById("temp").innerHTML = result.temp;
            document.getElementById("feels_like").innerHTML = result.feels_like;
            document.getElementById("humidity").innerHTML = result.humidity;
            document.getElementById("min_temp").innerHTML = result.min_temp;
            document.getElementById("max_temp").innerHTML = result.max_temp;
            document.getElementById("wind_speed").innerHTML = result.wind_speed;
            document.getElementById("wind_degrees").innerHTML = result.wind_degrees;
            document.getElementById("sunrise").innerHTML = new Date(result.sunrise * 1000).toLocaleTimeString();
            document.getElementById("sunset").innerHTML = new Date(result.sunset * 1000).toLocaleTimeString();
        }
    } catch (error) {
        console.error(`Error fetching weather for ${cityName || "Custom Location"}:`, error);
    }
}

// Fetch weather for default location (Delhi)
getweather(28.65195, 77.23149);

// Fetch weather for common cities
const commonCities = [
    { name: "shanghai", lat: 31.2304, lon: 121.4737 },
    { name: "boston", lat: 42.3601, lon: -71.0589 },
    { name: "kolkata", lat: 22.5726, lon: 88.3639 }
];

commonCities.forEach(city => getweather(city.lat, city.lon, city.name));

// Event Listener for Button Click
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();

    let latitude = document.getElementById("Latitude").value;
    let longitude = document.getElementById("Longitude").value;

    if (latitude && longitude) {
        getweather(latitude, longitude);
    } else {
        alert("Please enter both latitude and longitude!");
    }
});
