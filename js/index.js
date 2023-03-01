import currentWeather from './current-weather.js';
import { viewportSize } from './utils/viewport.js'

const $app = document.getElementById('app');
const $loader = document.getElementById('loading');
viewportSize($app)
viewportSize($loader)
currentWeather();