document.addEventListener('DOMContentLoaded', () =>{

    const locationInput = document.getElementById("location-input");
    const locationForm = document.getElementById("location-form");
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

    function extractWeatherData(data){
        if(data){
            return {
                location : data.name,
                temperature : (data.main.temp-273.15).toFixed(2),
                description : data.weather[0].description,
                feelslike : (data.main.feels_like - 273.15).toFixed(2),
                humidity : data.main.humidity,
                windspeed : (data.wind.speed * 3.6).toFixed(1)
            };
        }else{
            return null;
        }
    }

    function displayData(data){
        if(data){ 
            weatherInformation.innerHTML=`
            <h2>${data.location}</h2>
            <p>Temperature: ${data.temperature} °C</p>
            <p> Weather: ${data.description} <p>
            <p> Feels Like: ${data.feelslike} °C</p>
            <p> Humidity : ${data.humidity} % </p>
            <p> Wind Speed : ${data.windspeed} km/h <p>
            `
        }
        else{
            console.log('No weather data')
        }
    };

    locationForm.addEventListener('submit', async (event) =>{
        event.preventDefault();
        const location = locationInput.value;
        const weatherData = await fetchWeatherData(location);
        const extractData = extractWeatherData(weatherData);
        displayData(extractData);
    });
});