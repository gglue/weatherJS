class Forecast {
    constructor(){
        this.key = '0cbUzkkvqqdhQVxVPdhTNzttS2syKXsk';
        this.baseCity = 'https://dataservice.accuweather.com/locations/v1/cities/search';
        this.baseWeather = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.baseForecast = 'https://dataservice.accuweather.com/forecasts/v1/daily/1day/';
    }

    // This function helps get the city information
    async getCity(cityID){
        const query = `?apikey=${this.key}&q=${cityID}`;
        const response = await fetch(this.baseCity + query);
        const data = await response.json();

        return data[0];

    }

    // This function helps get the weather information based on the city
    async getWeather(cityID){
        const query = `${cityID}?apikey=${this.key}`;
        const response = await fetch(this.baseWeather + query);
        const data = await response.json();
    
        return data[0];
    }

    // This function helps get the weather information based on the city ahead
    async getTommorowWeather(cityID){
        const query = `${cityID}?apikey=${this.key}`;
        const response = await fetch(this.baseForecast + query);
        const data = await response.json();
    
        return data;
    }

    //Updates the info box if asking for today's weather
    async updateUI(cityID){
        const details = await this.getCity(cityID);
        const weather = await this.getWeather(details.Key);
        return {
            details: details,
            weather: weather
        }
    }

    //Updates the info box if asking for today's weather
    async updateUITmmrw(cityID){
        const details = await this.getCity(cityID);
        const weather = await this.getTommorowWeather(details.Key);
        return {
            details: details,
            weather: weather
        }
    }
}