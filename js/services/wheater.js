import {BASE_API, API_KEY} from '../constants.js'

export async function getCurrentWeather(lat, lon) {
    const response = await fetch(`${BASE_API}/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`);

    if (!response.ok) {
        return { isError: true, data: null }
    }

    const data = await response.json();
    return { isError: false, data }
}

export async function getWeeklyWeather(lat, lon) {
    const response = await fetch(`${BASE_API}/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`);

    if (!response.ok) {
        return { isError: true, data: null }
    }

    const data = await response.json();
    return { isError: false, data }
}
