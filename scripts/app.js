const searchBar = document.querySelector('form');
const box = document.querySelector('.d-none');
const infoBox = document.querySelector('.card-body');
const picture = document.querySelector('.card-img-top');
const weatherIcon = document.querySelector('.icon img');

searchBar.addEventListener('submit', e => {
    e.preventDefault();

    // Trim the input to make sure it's readable
    const city = searchBar.city.value.trim();
    searchBar.reset();

    // Use input to update the UI
    updateUI(city).then(data  => updateInfo(data))
    .catch(err => console.log(err));

});

const updateUI = async (city) => {
    const details = await getCity(city);
    const weather = await getWeather(details.Key);
    return {
        details: details,
        weather: weather
    }
}

const updateUITmmrw = async (city) => {
    const details = await getCity(city);
    const weather = await getTommorowWeather(details.Key);
    return {
        details: details,
        weather: weather
    }
}

const updateInfo = (cityInfo) => {
    const info = cityInfo.details;
    const weather = cityInfo.weather;

    if (box.classList.contains('d-none')) {box.classList.remove('d-none')};

    // Updates the information
    infoBox.innerHTML = `
    <div class = "card-title text-muted text-uppercase text-center details"> 
    <h5>${info.EnglishName}</h5> 
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    <div class="my-1">${weather.LocalObservationDateTime}</div>
    </div>
    <div class ="row text-center text-uppercase my-3 tmmrw">
        <div class = "col" style ="cursor: pointer;">
        Tommorow ->
        </div>
    </div>`

    // Add eventListener to the Tommorow Button
    const button = document.querySelector('.tmmrw');

    button.addEventListener('click', e => {
        e.preventDefault();

        // Trim the input to make sure it's readable
        const city = info.EnglishName;
    
        // Use input to update the UI
        updateUITmmrw(city).then(data  => updateInfoTmmrw(data))
        .catch(err => console.log(err));
    });

    // Updates the time of day picture
    let timeOfDay = null;
    if (weather.IsDayTime){
        timeOfDay = 'img/day.svg';
    }
    else {
        timeOfDay = 'img/night.svg';
    }
    picture.setAttribute('src', timeOfDay);

    // Updates the weather icon
    const weatherIconSource = `img/icons/${weather.WeatherIcon}.svg`;
    weatherIcon.setAttribute('src', weatherIconSource);

};

const updateInfoTmmrw = (cityInfo) => {
    const info = cityInfo.details;
    const weather = cityInfo.weather;

    if (box.classList.contains('d-none')) {box.classList.remove('d-none')};

    // Updates the information
    infoBox.innerHTML = `
    <div class = "card-title text-muted text-uppercase text-center details"> 
    <h5>${info.EnglishName}</h5> 
    <div class="my-3">${weather.Headline.Category}</div>
    <div class="display-4 my-4">
      <span>${Math.floor((weather.DailyForecasts[0].Temperature.Maximum.Value - 32) * (5/9))}</span>
      <span>&deg;C</span>
    </div>
    <div class="my-1">${weather.Headline.EffectiveDate}</div>
    </div>
    <div class ="row text-center text-uppercase my-3 today">
        <div class = "col" style ="cursor: pointer;">
        <- Today
        </div>
    </div>`

    // Add eventListener to the Tommorow Button
    const button = document.querySelector('.today');

    button.addEventListener('click', e => {
        e.preventDefault();

        // Trim the input to make sure it's readable
        const city = info.EnglishName;
    
        // Use input to update the UI
        updateUI(city).then(data  => updateInfo(data))
        .catch(err => console.log(err));
    });

    // Use default picture of night for tommorow
    picture.setAttribute('src', 'img/day.svg');

    // Updates the weather icon
    const weatherIconSource = `img/icons/${weather.DailyForecasts[0].Day.Icon}.svg`;
    weatherIcon.setAttribute('src', weatherIconSource);

}