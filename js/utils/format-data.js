const defaultConfigDateFormat = {
    day: 'numeric',
    weekday: 'long',
    month: 'long'
}

export function formatDate(date, options = defaultConfigDateFormat){
    return new Intl.DateTimeFormat('es', options).format(date);
}

export function formatTemp(value){
    return `${Math.floor(value)}°`;
}

export function formatHumidity(value){
    return `${value}%`;
}

export function formatSpeedWind(value){
    return `${Math.round(value*100,2)} Km-h`;
}

export function formatWeekList(rawData){
    let dayList = []
    const weekList = []

    rawData.forEach((item, index) => {
        dayList.push(item)
        if((index + 1) % 8 === 0){
            weekList.push(dayList)
            dayList = []
        }
    })
    return weekList;
}