const API_KEY = `e3aa50cd0bede80f018a193c136ae6e6`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const weather2 = document.querySelector("#weather2");


const getWeather = (city) => {
    weather.innerHTML = `<h2> Loading... <h2>`;
    weather2.innerHTML = '';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    // const response = await fetch(url);
    // const data = await response.json();
    // return showWeather(data);
    
    fetch(url)
    .then(res => res.json())
    .then(res => {
        const data = res;
        return showWeather(data);
    });
}   

const showWeather = (data) => {
    console.log(data);
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`;
        return;
    }

    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="150" height="150">
        </div>
        <div>
            <h3>${data.main.temp} ℃</h3>
            <h5>Feels Like ${data.main.feels_like} ℃</h5>
        </div>
    `;

    weather2.innerHTML = `
        <div>
            <h4> ${data.weather[0].main} (${data.weather[0].description})</h4>
            <ul>
            <li><h6>Humidity : ${data.main.humidity}%</h6></li>
            <li><h6>Pressure : ${data.main.pressure}mb</h6></li>
            <li><h6>Visibility : ${data.visibility}m</h6></li>
            <li><h6>Wind Degree : ${data.wind.deg}degrees</h6></li>
            <li><h6>Wind Speed : ${data.wind.speed}mph</h6></li>
            </ul>
        </div>
    `;

    weather.classList.add("bgStyle");
    weather2.classList.add("bgStyle2");
    weather.style.opacity = 1;
    weather2.style.opacity = 1;
}

form.addEventListener(
    "submit",
    function (event) {
        getWeather(search.value);
        event.preventDefault();
    }
)