import getWeatherIcon from '../../utils/getWeatherIcon';
import formatDay from '../../utils/formatDay';

const Day = function ({ date, max, min, code, i }) {
  return (
    <li className='day'>
      <span>{getWeatherIcon(code)}</span>

      <p>{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : formatDay(date)}</p>

      <p>
        {Math.round(min)}°C — <strong>{Math.round(max)}°C</strong>
      </p>
    </li>
  );
};

export default Day;
