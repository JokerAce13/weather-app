
const $dayWeatherList = document.querySelectorAll('.dayWeather-item');

$dayWeatherList.forEach(($dayWeather, index) => {
    $dayWeather.addEventListener('click', handleSelectedDayWeatherClick)
})

function handleSelectedDayWeatherClick(event) {
    debugger
    console.log('Entro')
    const $dayWeatherSelected = event.target
    const $dayWeatherActive = document.querySelector('.dayWeather-item[aria-selected="true"]')
    $dayWeatherActive.removeAttribute('aria-selected');
    $dayWeatherSelected.setAttribute('aria-selected', true);

    // const id = $tabSelected.id;
    // const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`)
    // const $tabPanelCurrentSelected = document.querySelector('.tabPanel:not([hidden])')
    // $tabPanel.hidden = false
    // $tabPanelCurrentSelected.hidden = true

    // $tabPanel.ariaSelected = true
    // $tabPanelCurrentSelected.ariaSelected = false
}