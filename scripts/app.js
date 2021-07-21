const searchBar = document.querySelector('form');
const box = document.querySelector('.d-none');
const infoBox = document.querySelector('.card-body');
const picture = document.querySelector('.time');


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

const updateInfo = (cityInfo) => {
    const info = cityInfo.details;
    const weather = cityInfo.weather;

    if (box.classList.contains('d-none')) {box.classList.remove('d-none')};

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
    <div class ="row text-center text-uppercase my-3">
        <div class = "col" style ="cursor: pointer;">
            Yesterday
        </div>
        <div class = "col" style ="cursor: pointer;">
            Tommorow
        </div>
    </div>`
}