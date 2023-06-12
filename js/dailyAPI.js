import WEATHER_API_KEY from "./keys.js";
const Key = WEATHER_API_KEY;
const city = 'Luanda';
let api = "";

const requestApi = (city) => {
    api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Key}&units=metric`;
    // txtInfo.innerHTML = "Getting Info";
    // infoBox.classList.add("pending");
    const data = fetchData(api);
    
    datakper();


  };
const datakper = (data) =>{
    console.log(data);
    const list = data.list;
    list.map((da) => {
        const date = da.dt_txt
        console.log(date);
    })
}
  // FUNCTION | GET API DATA
const fetchData = () => {
    fetch(api)
      .then((response) => response.json())
      .then((result) => datakper(result));
  };


  requestApi(city);