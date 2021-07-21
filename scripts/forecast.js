const key = '0cbUzkkvqqdhQVxVPdhTNzttS2syKXsk';

// This function helps get the city information
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

// This functio nhelps get the weather information based on the city
const getWeather = async (cityID) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityID}?apikey=${key}`;
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};
