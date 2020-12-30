function setWeather() {
    let city_name = search_city.value === "" ? "Мытищи" : encodeURIComponent(search_city.value);
    let api_key = "32273e1edabe3f7e12571409dbace3cf";
    let conf = "&lang=ru&units=metric&appid=";

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city_name + conf + api_key)
        .then(response => response.json())
        .then(result => {
            if (result.cod === "404") {
                alert("Город не найден")
            } else {
                setCurrentWeather(result);
                
                fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city_name + conf + api_key)
                    .then(response => response.json())
                    .then(result => setWeekWeather(result)
                );
            }
        },
        error => alert(error)
    );
}

function setCurrentWeather(weatherObject) {
    document.getElementById('country').innerHTML = weatherObject.sys.country + ",";
    document.getElementById('city_name').innerHTML = weatherObject.name + ",";
    const timezone = weatherObject.timezone / 3600;
    document.getElementById('timezone').innerHTML = timezone >= 0 ? "UTC +" + timezone : "UTC " + timezone;

    const temp = Math.round(weatherObject.main.temp);
    document.getElementById('temp').innerHTML = temp >= 0 ? "+" + temp + "°" : temp + "°";
    document.getElementById('icon').src = "http://openweathermap.org/img/wn/" + weatherObject.weather[0].icon + "@2x.png";
    document.getElementById('description').innerHTML = weatherObject.weather[0].description[0].toUpperCase() + weatherObject.weather[0].description.slice(1);
    const feels_like = Math.round(weatherObject.main.feels_like);
    document.getElementById('feels_like').innerHTML = feels_like >= 0 ? "Ощущается как " + "+" + feels_like + "°" : "Ощущается как " + feels_like + "°";

    document.getElementById('wind_speed').innerHTML = weatherObject.wind.speed + " м/с";
    document.getElementById('humidity').innerHTML = weatherObject.main.humidity + "%";
    document.getElementById('pressure').innerHTML = Math.round(weatherObject.main.pressure * 0.750062) + " мм рт. ст.";
}

function setWeekWeather(weatherObject) {
    if (document.getElementById('week-data-id')) {
        document.getElementById('week-data-id').remove();
    }

    let weatherHoursDiv = document.createElement("div");
    weatherHoursDiv.className = "weekData";
    weatherHoursDiv.id = "week-data-id";
    document.getElementById("week-weather-inner-id").appendChild(weatherHoursDiv);

    for (i = 0; i < weatherObject.list.length; i += 3) {
        let date = new Date(0);
        date.setUTCSeconds(weatherObject.list[i].dt);

        const day = date.toLocaleDateString('ru-RU', {weekday: 'short', day: 'numeric', month: 'short'});
        const time = date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}); 

        const description = weatherObject.list[i].weather[0].description[0].toUpperCase() + weatherObject.list[i].weather[0].description.slice(1);

        let temp = Math.round(weatherObject.list[i].main.temp);
        temp = temp >= 0 ? "+" + temp + "°" : temp + "°";

        let feels_like = Math.round(weatherObject.list[i].main.feels_like);
        feels_like = feels_like >= 0 ? "Ощущается как " + "+" + feels_like + "°" : "Ощущается как " + feels_like + "°";


        let newDiv = document.createElement("div");
        newDiv.className = "hoursInfo";


        let dayTimeDiv = document.createElement("div");
        dayTimeDiv.className = "day_time";
        dayTimeDiv.innerHTML = day + " " + time;
        newDiv.appendChild(dayTimeDiv);
        

        let descriptionDiv = document.createElement("div");
        descriptionDiv.className = "description";
        descriptionDiv.innerHTML = description;
        newDiv.appendChild(descriptionDiv);


        let tempIconDiv = document.createElement("div");
        tempIconDiv.className = "tempIcon";

        let tempSpan = document.createElement("span");
        tempSpan.className = "week_temp";
        tempSpan.innerHTML = temp;
        tempIconDiv.appendChild(tempSpan);

        let iconImg = document.createElement("img");
        iconImg.className = "week_icon";
        iconImg.src = "http://openweathermap.org/img/wn/" + weatherObject.list[i].weather[0].icon + "@2x.png";
        iconImg.alt = "icon";
        tempIconDiv.appendChild(iconImg);

        newDiv.appendChild(tempIconDiv);


        let feelsLikeDiv = document.createElement("div");
        feelsLikeDiv.className = "feelsLike";
        feelsLikeDiv.innerHTML = feels_like;
        newDiv.appendChild(feelsLikeDiv);


        document.getElementById("week-data-id").appendChild(newDiv);
    }
}
