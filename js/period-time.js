import { createDOM } from './utils/dom.js'
import { formatDate, formatTemp, formatHumidity, formatSpeedWind } from './utils/format-data.js'

export function getPeriodTimeTemplate(config, tabPanelIndex, weatherIndex){
    const $tabPanel = document.getElementById(`dayWeather-${tabPanelIndex}`)
    const $atmosphericVar = createDOM(getAtmosphericVarTemplate(config, tabPanelIndex, weatherIndex))
    $tabPanel.append($atmosphericVar)

    return `
    <li class="dayWeather-item ${ weatherIndex === 0 ? 'is-selected' : '' } ">
        <span class="dayWeather-time">${config.date}</span>
        <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${config.icon}@2x.png" alt="${config.description}" rain="">
        <span class="dayWeather-temp">${config.temp}</span>
    </li>`
}

export function getAtmosphericVarTemplate(config, tabPanelIndex, weatherIndex){

    return `
    <div id="atmosphericVar-tp${tabPanelIndex}-w${weatherIndex}" class="dayWeather-atmosphericVar ${ weatherIndex !== 0 ? 'is-hidden' : '' } ">
        <div class="atmosphericVar">
            <span>Máx: <strong id="atmosphericVarMax-${tabPanelIndex}">${config.tempMax}</strong></span>
            <span>Mín: <strong id="atmosphericVarMin-${tabPanelIndex}">${config.tempMin}</strong></span>
        </div>
        <div class="atmosphericVar">
            <span>Viento: <strong id="atmosphericVarSpeedWind-${tabPanelIndex}">${config.speedWind}</strong></span>
            <span>Humedad: <strong id="atmosphericVarHumidity-${tabPanelIndex}">${config.humidity}</strong></span>
        </div>
    </div>`
}

export function createPeriodTime(weather, tabPanelIndex, weatherIndex){
    const dateOptions = {
        hour: 'numeric',
        hour12: true
    }
    const temp = formatTemp(weather.main.temp)
    const date = formatDate(new Date(weather.dt * 1000), dateOptions)
    const tempMax = formatTemp(weather.main.temp_max)
    const tempMin = formatTemp(weather.main.temp_min)
    const humidity = formatHumidity(weather.main.humidity)
    const speedWind = formatSpeedWind(weather.wind.speed)

    const config = {
        temp,
        tempMax,
        tempMin,
        humidity,
        speedWind,
        date,
        icon: weather.weather[0].icon,
        description: weather.weather[0].description
    }
    return createDOM(getPeriodTimeTemplate(config, tabPanelIndex, weatherIndex))
}