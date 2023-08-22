document.addEventListener('DOMContentLoaded', () =>{

    const locationInput = document.getElementById("location-input");
    const searchButton = document.getElementById("search-button");
    const weatherInformation = document.getElementById("weather-info");

    async function fetchWeatherData(location){
        const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b2f7430a94fc9964b6f9768988425fd7`
        try{
            const response = await fetch(endpoint, { mode: "cors" });
            const data = response.json();
            return data;
        }
        catch(error){
            console.error('Error fetching weather data', error);
            return null;
        }
    }

    function displayData(data){
        if(data){
            const temperatureCelsius = data.main.temp - 273.15; 
            weatherInformation.innerHTML=`
            <h2> Weather in ${data.name}</h2>
            <p>Temperature: ${temperatureCelsius.toFixed(2)} °C</p>
            <p> Weather: ${data.weather[0].description} <p>
            `
        }
        else{
            console.log('No weather data')
        }
    };

    searchButton.addEventListener('click', async () =>{
        const location = locationInput.value;
        const weatherData = await fetchWeatherData(location);
        displayData(weatherData);
    });
});