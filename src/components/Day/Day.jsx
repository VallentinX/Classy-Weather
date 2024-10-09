import weatherToEmoji from '../../utils/getWeatherIcon';
import formatDay from '../../utils/formatDay';
import { Twemoji } from 'react-emoji-render';
import fToC from '../../utils/convertDeg';

const Day = function ({ alerts, day, onOpenModal, i }) {
  const { datetime, tempmin, tempmax, icon } = day;
  const checkAlerts = datetime === alerts[0]?.onset.slice(0, 10);
  const infoAlert = checkAlerts ? alerts[0] : null;

  const info = {
    day,
    infoAlert,
  };

  return (
    <li
      className={`${checkAlerts ? 'day alert' : 'day'}`}
      onClick={() => onOpenModal(datetime, info)}
    >
      <p>{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : formatDay(datetime)}</p>

      <Twemoji text={checkAlerts ? '⚠️' : weatherToEmoji(icon)} />

      <p>
        {Math.round(fToC(tempmin))}°C —<strong>{Math.round(fToC(tempmax))}°C</strong>
      </p>
    </li>
  );
};

export default Day;
