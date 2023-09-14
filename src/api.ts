
export const geoApiOptions = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': `${import.meta.env.VITE_GEO_API}`,
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

export const GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0';