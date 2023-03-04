const $tabsContainer = document.querySelector('#tabs');
const $tabList = $tabsContainer.querySelectorAll('.tab');

const today = new Date();
let weekday = today.getDay();

const weekDayNames = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado'
]

function nextDay(day){
    if(day === 6) return 0
    return day + 1;
}

$tabList.forEach(($tab, index) => {
    $tab.addEventListener('click', handleSelectedTabClick)

    if(index === 0) {
        $tab.textContent = 'Hoy'
    } else {
        $tab.textContent = weekDayNames[weekday]
    }
    weekday = nextDay(weekday)
})

function handleSelectedTabClick(event) {
    const $tabSelected = event.target
    const $tabActive = document.querySelector('.tab[aria-selected="true"]')
    $tabActive.removeAttribute('aria-selected');
    $tabSelected.setAttribute('aria-selected', true);

    const id = $tabSelected.id;
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`)
    const $tabPanelCurrentSelected = document.querySelector('.tabPanel:not([hidden])')
    $tabPanel.hidden = false
    $tabPanelCurrentSelected.hidden = true
}