$(document).ready(function() {
    // Geolocation to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Fetch weather data based on the latitude and longitude
            fetchWeatherData(lat, lon);
        }, function(error) {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    // Function to fetch weather data from the API
    function fetchWeatherData(lat, lon) {
        const url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;

        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                // Update the UI with the fetched data
                $('#city').text(data.name);
                $('#country').text(data.sys.country);
                $('#temp').text(data.main.temp.toFixed(1));
                $('#desc').text(data.weather[0].description);
                
                // Set weather icon
                const iconCode = data.weather[0].icon;
                $('#icon').attr('src', `http://openweathermap.org/img/wn/${iconCode}.png`);
            },
            error: function() {
                // If the API call fails, show an error message
                alert("Error fetching weather data. Please try again.");
            }
        });
    }
});
