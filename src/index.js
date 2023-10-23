import("./style.css");

const apiKey = "7450826869684056ab1234656231910";

const baseURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&`;

const weatherContainer = document.querySelector('.weather-container');

async function getWeatherForLocation(location) {
	const response = await fetch(`${baseURL}q=${location}&aqi=no`);
	const parsedResponse = await response.json();
	console.log(parsedResponse);
	return parsedResponse;
}

async function generateWeatherBadgeForLocation(location) {

	const parsedResponse = await getWeatherForLocation(location);
    const locationName = parsedResponse.location.name;
    const temperature = parsedResponse.current.temp_c;
    const windDirection = parsedResponse.current.wind_dir;
    const windSpeed = parsedResponse.current.wind_kph;
    
    const element = document.createElement('div');
    element.classList.add('weather-badge')
    element.id = `${location}`;

    const weatherString = `
        <div class="city-header">
            <div class="city-name">${locationName}:</div>
            <div class="city-image"><img src="${weatherImageSrc}" class="weather-image"></div>
        </div>
        <div class="conditions">
    <p>Temperature: ${temperature} communist degrees</p>
            <p>Wind from: ${windDirection} with ${windSpeed} km/hr</p>
        </div>`

    element.innerHTML = weatherString;

    weatherContainer.appendChild(element);    
}

const locationsArray = ['New York', 'Bennekom', 'Hong Kong', 'Buenos Aires'];

locationsArray.forEach((location) => generateWeatherBadgeForLocation(location))