import { Twemoji } from 'react-emoji-render';
import Day from '../Day/Day';

function countryCodeToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 0x1f1e6 + char.charCodeAt() - 65);

  return String.fromCodePoint(...codePoints);
}

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

        <Twemoji text={countryCodeToFlag(flag)} />
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
