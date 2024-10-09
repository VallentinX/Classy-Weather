import { useState, useEffect } from 'react';

const useAPIWeather = function () {
  const [city, setCity] = useState(() => localStorage.getItem('city') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);
  const [areaInfo, setAreaInfo] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    async function getWeather() {
      setError('');
      setIsLoading(true);

      try {
        const cityResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
          {
            signal: controller.signal,
          }
        );

        if (!cityResponse.ok) throw new Error('Something went wrong with geocoding');

        const cityData = await cityResponse.json();

        if (!cityData.results || cityData.results.length === 0)
          throw new Error('Location not found');

        const { latitude, longitude, name, country_code, country } = cityData.results[0];

        // Fetch the 7-day weather forecast
        const weatherResponse = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=TV94CKKF5374E6XVEKGXF7ZHV`
        );

        if (!weatherResponse.ok) throw new Error('Something went wrong with weather data');

        const weatherData = await weatherResponse.json();

        if (!weatherData) throw new Error("Couldn't get the weather data");

        setWeather(weatherData);
        setAreaInfo({ city: name, flag: country_code.toLowerCase(), country });
      } catch (error) {
        if (error.name !== 'AbortError') setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (city.length < 3) {
      setWeather(null);
      setError('');
      return;
    }

    getWeather();

    return function () {
      controller.abort();
    };
  }, [city]);

  useEffect(() => {
    localStorage.setItem('city', city);
  }, [city]);

  return { city, error, isLoading, weather, areaInfo, setCity };
};

export default useAPIWeather;
