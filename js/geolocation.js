function geolocationSupport(){
    return 'geolocation' in navigator;
}

//Propiedades por defecto
const defaultOptions = {
    enableHighAccuracy: true, //Precisión de la respuesta
    timeout: 5000, //Tiempo de espera de la petición
    maximumAge: 100000 //Tiempo en cache de la respuesta de la petición
}

export function getCurrentPosition(options = defaultOptions){
    if(!geolocationSupport()) throw new Error('No hay soporte de geolocalización en su navegador');

    //Una promesa recibe un callback o función, la cual recibe 2 parametros: resolve en caso de exito y reject en caso de fallo
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve(position);
        }, () => {
            reject('No hemos logrado obtener la geolocalización, revisar si brindado los permisos necesarios')
        }, options);
    })
}

export async function getLatLon(options = defaultOptions) {
    try {
        const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(options);
        return { lat, lon, isError: false };
    } catch (error) {
        return { lat: null, lon: null, isError: true };
    }
}