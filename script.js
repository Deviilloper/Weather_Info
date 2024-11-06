const button = document.getElementById("search-button");
const input = document.getElementById("city-input");
const city_name = document.getElementById("city-name");
const city_time = document.getElementById("city-time");
const city_temp = document.getElementById("city-temp");
const weatherInfoDiv = document.getElementById("weather-info");



async function getDataByCity(cityName){
    const promise  = await fetch(`http://api.weatherapi.com/v1/current.json?key=663bfc3cc89b452f807174514242710&q=${cityName}&aqi=yes`);
    return await promise.json();
}
async function getDataByLatLong(lat,long){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=663bfc3cc89b452f807174514242710&q=${lat},${long}&aqi=yes`);
    return await promise.json();
}

button.addEventListener("click" , async () => 
    {   const result = await getDataByCity(input.value);
        city_name.innerText = result.location.name + "," + result.location.region + " - " + result.location.country;
        city_time.innerText = result.location.localtime;
        city_temp.innerText = result.current.temp_c + "°C";
        // city_name.innerText = `${result.location.name},${result.location.region} - ${result.location.country}`;
        // city_time.innerText = `${result.location.localtime}`;
        // city_temp.innerText = `${result.current.temp_c}°C`;
        weatherInfoDiv.style.display = "block";
    });

window.addEventListener("load",async () => {
    navigator.geolocation.getCurrentPosition(async (position) => 
        {const result = await getDataByLatLong(position.coords.latitude,position.coords.longitude)
         city_name.innerText = result.location.name + "," + result.location.region + " - " + result.location.country;
         city_time.innerText = result.location.localtime;
         city_temp.innerText = result.current.temp_c + "°C";
         weatherInfoDiv.style.display = "block";
        } , () => {alert("Error!")})
})
