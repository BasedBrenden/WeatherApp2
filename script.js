const searchValue = document.querySelector('.zipSearch');
const skies = document.querySelector('.skies');

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let testData = getPrimaryCardData();
    console.log(testData)

}, false);

async function getPrimaryCardData(){
    let searchZip = searchValue.value;


    try{
    const firstSearch = await fetch('http://api.openweathermap.org/data/2.5/weather?zip=' + searchZip +',us&APPID=5512e7a00e47ffc14cacc43c7b9a21b8', {mode: 'cors'})
    const weatherData = await firstSearch.json();

    let longitude= weatherData.coord.lon
    let latitude = weatherData.coord.lat

    const weeklyData = getWeeklyData(latitude,longitude)

    let temp = Math.floor(((weatherData.main.temp)-273.15)*(9/5)+32);
    let city = weatherData.name;
    updateWeatherStatus(weatherData.weather[0].main, temp, city)


    return weeklyData;
    } catch (error){
        //viewPort.innerHTML = 'Please enter a valid zipcode to search for a locations current weather'
        searchValue.value = ''
        skies.innerHTML = ''
        return error;
    }

}


async function getWeeklyData(lat,lon){

    try{
        const weekSearch = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=current,minutely,hourly,alerts&appid=5512e7a00e47ffc14cacc43c7b9a21b8', {mode: 'cors'})
        const weatherData = await weekSearch.json();

        let weekDisplay = document.querySelector('.weekDisplay');
        weekDisplay.innerHTML = ''
        
        for(let i = 1; i < 7; i++){
            let temp2 = Math.floor(((weatherData.daily[i].temp.day)-273.15)*(9/5)+32);
            updateWeekWeatherStatus(weatherData.daily[i].weather[0].main, temp2)
        }
        return weatherData;
    } catch (error){
        searchValue.value = ''
        skies.innerHTML = ''
        return error;
    }


}

function updateWeatherStatus(sky, degree, location){

    if(sky == "Clouds"){
        let newSpan = document.createElement('span');
        createMainWeatherCard(newSpan,degree,location);
        newSpan.innerHTML = 'wb_cloudy'

    }

    if(sky == "Rain"){
        let newSpan = document.createElement('span');
        createMainWeatherCard(newSpan,degree,location);
        newSpan.innerHTML = 'bolt'

    }

    if(sky == "Clear"){
        let newSpan = document.createElement('span');
        createMainWeatherCard(newSpan,degree,location);
        newSpan.innerHTML = 'brightness_high'

    }

    if(sky == "Snow"){
        let newSpan = document.createElement('span');
        createMainWeatherCard(newSpan,degree,location);
        newSpan.innerHTML = 'ac_unit'
    }

}

function createMainWeatherCard(newSpan, degree, location){
    let newDiv = document.createElement('DIV');
    newDiv.classList.add("card")
    skies.innerHTML = ''
    newSpan.classList.add("material-icons")
    newSpan.classList.add("md-48")
    newSpan.classList.add("icon")

    let viewPort = document.createElement('h2');
    viewPort.classList.add("weatherData")
    viewPort.innerHTML = location + ' ' + degree +"°F";

    skies.appendChild(newDiv);
    newDiv.appendChild(newSpan);
    newDiv.appendChild(viewPort)
}





function updateWeekWeatherStatus(sky, degree){

    if(sky == "Clouds"){
        let newSpan = document.createElement('span');
        createWeekWeatherCard(newSpan,degree);
        newSpan.innerHTML = 'wb_cloudy'

    }

    if(sky == "Rain"){
        let newSpan = document.createElement('span');
        createWeekWeatherCard(newSpan,degree);
        newSpan.innerHTML = 'bolt'

    }

    if(sky == "Clear"){
        let newSpan = document.createElement('span');
        createWeekWeatherCard(newSpan,degree);
        newSpan.innerHTML = 'brightness_high'

    }

    if(sky == "Snow"){
        let newSpan = document.createElement('span');
        createWeekWeatherCard(newSpan, degree);
        newSpan.innerHTML = 'ac_unit'
    }

}

function createWeekWeatherCard(newSpan,degree){
    const weekDisplay = document.querySelector('.weekDisplay');

    let newDiv = document.createElement('DIV');
    newDiv.classList.add("card")
    newDiv.style.textAlign = 'center'
    
    newSpan.classList.add("material-icons")
    newSpan.classList.add("md-48")
    newSpan.classList.add("icon")

    let viewPort = document.createElement('h2');
    viewPort.classList.add("weatherData")
    viewPort.innerHTML = degree +"°F";

    weekDisplay.appendChild(newDiv);
    newDiv.appendChild(newSpan);
    newDiv.appendChild(viewPort)
}