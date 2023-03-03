import { getWeeklyWeather } from './services/wheater.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'
import { createPeriodTime } from './period-time.js'
import draggable from './draggable.js'

function getTabPanelTemplate(id){
    return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
    <div class="dayWeather" id="dayWeather-${id}">
      <ul class="dayWeather-list" id="dayWeather-list-${id}">
      </ul>
    </div>
  </div>
    `
}

function createTabPanel(id){
    const $tabPanel = createDOM(getTabPanelTemplate(id))
    if(id > 0){
        $tabPanel.hidden = true
    }
    return $tabPanel;
}

function configWeeklyWeather(weekList) {
    //const $container = document.querySelector('.weeklyWeather')
    const $container = document.querySelector('.tabs')
    weekList.forEach((day, tabPanelIndex) => {
        const $tabPanel = createTabPanel(tabPanelIndex)
        $container.append($tabPanel)

        const $listTabPanel = document.querySelector(`#dayWeather-list-${tabPanelIndex}`)

        day.forEach((weather, weatherIndex) => {
            const $periodTime = createPeriodTime(weather, tabPanelIndex, weatherIndex)
            $listTabPanel.append($periodTime)
        })
    })
}

export default async function weeklyWeather() {
    const $container = document.querySelector('.weeklyWeather')

    const { lat, lon, isError } = await getLatLon();
    if (isError) return console.log('Ha ocurrido un error');
    console.log(lat, lon);

    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon);
    if (weeklyWeatherError) return console.log('Ha ocurrido un error obteniendo el pronostico del clima!')

    const weekList = formatWeekList(weather.list)
    configWeeklyWeather(weekList);
    draggable($container)

    const $dayWeatherList = document.querySelectorAll('.dayWeather-item');

    $dayWeatherList.forEach(($dayWeather, index) => {
            $dayWeather.addEventListener('click', handleSelectedDayWeatherClick)
    })

    function handleSelectedDayWeatherClick(event) {
        const $dayWeatherSelected = event.currentTarget
        const $parentTarget = $dayWeatherSelected.parentElement
        const $dayWeatherActive = $parentTarget.querySelector('.dayWeather-item.is-selected')

        $dayWeatherActive.classList.remove('is-selected');
        $dayWeatherSelected.classList.add('is-selected');
    }

}