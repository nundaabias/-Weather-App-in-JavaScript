/*
* Author: Abias Nunda
* Year: 2023
*/

// GETTING THE MAIN SELECTORS
const wrapper = document.querySelector(".weather-app"),
  btnBack = document.querySelector("#btnBack"),
  txtCity = document.querySelector("#txtCity"),
  btnGet = document.querySelector("#btnGet"),
  infoBox = document.querySelector("#infoBox"),
  txtInfo = document.querySelector("#txtInfo"),
  weatherIcon = document.querySelector('.weather-view img');

//   IMPORT openWeather api Key
import Keys from './keys.js';
const Key = Keys();
let api = '';

//BTN | TO GO BACK TO THE FORM VIEW
btnBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
    txtCity.value = '';
});

// TXT BOX | ADDING SUBMIT FUCTION
txtCity.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && txtCity.value != "") {
    requestApi(txtCity.value);
  }
});

// FUNCTION | USING THE API TO REQUEST WEATHER INFO
const requestApi = (city) => {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Key}&units=metric`;
  txtInfo.innerHTML = "Getting Info";
  infoBox.classList.add("pending");
  fetchData(api);
};

// BTN | GET THE USERS GEO INFO
btnGet.addEventListener("click", () => {
  if (navigator.geolocation) {
    // If the browser supports geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser does not support geolocation api");
  }
});
const onSuccess = (position) => {
    const {latitude, longitude} = position.coords; // getting lat and lon of the user divice 
    api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}&units=metric`;
    fetchData();
};

const onError = (error) => {
    txtInfo.innerHTML = error.message;
    infoBox.classList.add("error");
};

// FUNCTION | GET API DATA
const fetchData = () => {
    fetch(api)
    .then((response) => response.json())
    .then((result) => waetherDetails(result));
}

// FUNCTION | CHECK IF CITY IS CORRECT AND DISPLAY INFO
const waetherDetails = (info) => {
    console.log(info);
    if(info.cod == '404') {
      txtInfo.innerHTML = `Cannot fint ${txtCity.value}`;
      infoBox.classList.replace('pending', "error");
    }else {
        // GETTING THE VALUES FROM THE INFO OBJECT
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like,  humidity, temp} = info.main;

        if(id == 800){ // Clear Sky
            weatherIcon.src = './svg/day.svg';
        }else if(id > 800 & id < 805){ // Cloudy
            weatherIcon.src = './svg/cloudy.svg';

        }else if(id > 700 & id < 782){ //Atmosphere
            weatherIcon.src = './svg/rainy-3.svg';

        }else if(id > 599 & id < 623){ //Snow
            weatherIcon.src = './svg/snowy-5.svg';

        }else if(id > 499 & id < 532){ //Rain
            weatherIcon.src = './svg/rainy-6.svg';

        }else if(id > 299 & id < 322){ //Drizzle
            weatherIcon.src = './svg/rainy-1.svg';

        }else if(id > 199 & id < 233){ //Thunderstorm
            weatherIcon.src = './svg/thunder.svg';

        }
        // ADDING THE VALUES TO THE HTML
        wrapper.querySelector(".temp .number").innerText = Math.floor(temp);
        wrapper.querySelector(".weather-title").innerText = description;
        wrapper.querySelector(".location .country").innerText = `${city}, ${country}`;
        wrapper.querySelector(".app-footer .feels").innerText = Math.floor(feels_like);
        wrapper.querySelector(".app-footer .humidity").innerText = Math.floor(humidity);

      infoBox.classList.remove('pending', "error");
      wrapper.classList.add("active");
  
    }
  };