import("./style.css");

const apiKey = "7450826869684056ab1234656231910";

const baseURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&`;

const weatherContainer = document.querySelector('.weather-container');

async function getWeatherForLocation(location) {
	const response = await fetch(`${baseURL}q=${location}&aqi=no`);
	const parsedResponse = await response.json();
	console.log(parsedResponse);
	return Promise.resolve(parsedResponse);
}

async function generateWeatherBadgeForLocation(location) {

    const parsedResponse = await getWeatherForLocation(location);
    const locationName = parsedResponse.location.name;
    const temperature = parsedResponse.current.temp_c;
    const windDirection = parsedResponse.current.wind_dir;
    const windSpeed = parsedResponse.current.wind_kph;
    const weatherImageSrc = parsedResponse.current.condition.icon;
    const isDay = parsedResponse.current.is_day;
    
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

    // Conditionals for certain values in the badge

    // Day/Night
    if (!isDay) {
        element.style.backgroundColor = '#00004d';
        element.style.color = '#f2f2f2';
    }

    weatherContainer.appendChild(element);    
    return Promise.resolve(element)
}

async function renderView(array) {
    while(await array.forEach((element) => generateWeatherBadgeForLocation(element))){
        // loading
        console.log('loading')
    }
    return Promise.resolve(false);
}

const locationsArray = ['New York', 'Bennekom','Hong Kong','Buenos Aires','Cape Town', 'Sao Paulo', 'Rio de Janeiro','Bangkok','Tokyo','Los Angeles','New York'];

// renderView(locationsArray)

function addButton(){
    body = document.body;

    const formField = document.createElement('input');
    formField.type = "text";
    formField.id = 'location';
    body.appendChild(formField);

    const button = document.createElement('button');
    button.textContent = "Weather at location"
    button.onclick = () => {
        const locField = document.getElementById('location');
        const location = locField.value;
        generateWeatherBadgeForLocation(location)
    }

    body.appendChild(button);
    
}

addButton();