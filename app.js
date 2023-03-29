
// Carregando elementos do HTML nas contantes pelo ID
const citySearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')

const currentDate = document.getElementById('current-date')
const cityName = document.getElementById('city-name')
const weatherIcon = document.getElementById('weather-icon')
const weatherDescription = document.getElementById('weather-description')
const currentTemperature = document.getElementById('current-temperature')
const windSpeed = document.getElementById('wind-speed')
const feelsLikeTemperature = document.getElementById('feels-like-temperature')
const currentHumidity = document.getElementById('current-humidity')
const sunriseTime = document.getElementById('sunrise-time')
const sunsetTime = document.getElementById('sunset-time')

const api_Key = '8cd749e3ecb4bd271c129815b941464a' //pega chave do site https://openweathermap.org/

//Função do evento click
citySearchButton.addEventListener("click", () =>{
    let cityName = citySearchInput.value
    getCityWeather(cityName)
})

//função do navegador para pegar a posição atual em latitude e longitude
navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metrics&lang=pt_br&appid=${api_Key}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
    },
    (err) =>{
        if (err.code ===1){
            alert('Geolocalização não permitida pelo usuário.')
        }else{
            alert(err)
        }
        
    }

)

function getCityWeather(cityName){
    weatherIcon.src = `./assets/loading-icon.svg` //carregar o svg de buscar enquanto carrega a imagem
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metrics&lang=pt_br&appid=${api_Key}`) //
    .then((response) => response.json()) //transforma o response em um objeto json
    .then((data) => displayWeather(data)) 
}
function displayWeather(data){
    let {
        dt,
        name,
        weather: [{ icon, description}],
        main: { temp, feels_like, humidity },
        wind: {speed},
        sys: { sunrise, sunset },
    } = data 

    currentDate.textContent = formatDate(dt);
    cityName.textContent = name;

    weatherDescription.textContent = description;
    weatherIcon.src = `./assets/${icon}.svg`
    currentTemperature.textContent = `${Math.round(temp/10)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}Km`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like/10)}°C`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);

}

function formatDate(epochTime){
    let date = new Date (epochTime * 1000)
    let formattedDate = date.toLocaleDateString('pt-BR', { month : "long", day : "numeric"})
    
    return `Hoje, ${formattedDate}`
}

function formatTime(epochTime){
    let date = new Date (epochTime * 1000)
    let hours = date.getHours()
    let min = date.getMinutes()
    
    return `${hours}:${min}`
}


