import Day from '../Day/Day';

const DisplayWeather = function ({ weather, areaInfo }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  const { city, flag, country } = areaInfo;

  return (
    <>
      <div className='city'>
        <h2>
          Weather in {city}, {country}
        </h2>

        <img src={`https://flagcdn.com/24x18/${flag}.png`} alt='country flag' />
      </div>

      <ul className='weather'>
        {dates.map((date, i) => (
          <Day key={date} date={date} max={max.at(i)} min={min.at(i)} code={codes.at(i)} i={i} />
        ))}
      </ul>
    </>
  );
};

export default DisplayWeather;
