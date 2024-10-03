import { useState, useEffect } from 'react';

const useAPIWeather = function () {
  const [city, setCity] = useState(() => localStorage.getItem('city') || '');
  const [isLoading, setIsLoading] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);
  const [areaInfo, setAreaInfo] = useState({});

  useEffect(
    function () {
      const controller = new AbortController();

      async function getWeather() {
        setError('');
        setIsLoading(isLoading => !isLoading);

        try {
          const cityResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
            {
              signal: controller.signal,
            }
          );

          if (!cityResponse.ok) throw new Error('Something went wrong');

          const cityData = await cityResponse.json();

          if (!cityData.results) throw new Error('Location not found');

          const { latitude, longitude, timezone, name, country_code, country } =
            cityData.results.at(0);

          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );

          if (!weatherResponse.ok) throw new Error('Something went wrong');

          const weatherData = await weatherResponse.json();

          if (!weatherData) throw new Error("Couldn't get the data");

          setWeather(weatherData.daily);
          setAreaInfo({ city: name, flag: country_code.toLowerCase(), country });
        } catch (error) {
          if (error.name !== 'AbortError') setError(error.message);
        } finally {
          setIsLoading(isLoading => !isLoading);
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
    },
    [city]
  );

  useEffect(() => {
    localStorage.setItem('city', city);
  }, [city]);

  return { city, error, isLoading, weather, areaInfo, setCity };
};

export default useAPIWeather;
