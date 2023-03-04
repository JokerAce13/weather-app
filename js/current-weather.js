import { formatDate, formatTemp } from './utils/format-data.js'
import { weatherConditionCodes } from './constants.js'
import { getLatLon } from './geolocation.js'
import { getCurrentWeather } from './services/wheater.js'

function setCurrentCity($element, city){
    $element.textContent = city;
}

function setCurrentDate($element){
    const date = new Date();
    const formatedDate = formatDate(date);
    $element.textContent = formatedDate;
}

function setCurrentTemp($element, temp){
    $element.textContent = formatTemp(temp);
}

function solarStatus(sunriseTime, sunsetTime) {
    const currentHours = new Date().getHours();
    const sunsetHours = sunsetTime.getHours();
    const sunriseHours = sunriseTime.getHours();

    if(currentHours > sunsetHours || currentHours < sunriseHours) return 'night';

    return 'morning';
}

function setBackground($element, solarStatus, conditionCode){
    const weatherType = weatherConditionCodes[conditionCode];
    const isBigScreen = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches;
    $element.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${isBigScreen ? '@2x' : ''}.jpg)`;
}

function showCurrentWeather($app, $loader){
    $app.hidden = false;
    $loader.hidden = true;
}

function configCurrentWeather(weather){
    //loader
    const $app = document.getElementById('app');
    const $loader = document.getElementById('loading');
    showCurrentWeather($app, $loader);
    //date
    const $currentWeatherDate = document.getElementById('current-weather-date');
    setCurrentDate($currentWeatherDate);
    //city
    const $currentWeatherCity = document.getElementById('current-weather-city');
    const city = weather.name;
    setCurrentCity($currentWeatherCity, city);
    //temp
    const $currentWeatherTemp = document.getElementById('current-weather-temp');
    const temp = weather.main.temp;
    setCurrentTemp($currentWeatherTemp, temp);
    //background
    const sunriseTime = new Date(weather.sys.sunrise * 1000)
    const sunsetTime = new Date(weather.sys.sunset * 1000)
    const conditionCode = String(weather.weather[0].id).charAt(0);
    setBackground($app, solarStatus(sunriseTime, sunsetTime), conditionCode);
}

export default async function currentWeather() {
    //Utilizando programación asincrona y un objeto de respuesta
    const { lat, lon, isError } = await getLatLon();
    if (isError) return console.log('Ha ocurrido un error');

    const { isError: currentWeatherError, data: weather } = await getCurrentWeather(lat, lon);
    if (currentWeatherError) return console.log('Ha ocurrido un error!')

    configCurrentWeather(weather);
}