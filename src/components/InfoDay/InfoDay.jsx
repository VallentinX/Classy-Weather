import formatDay from '../../utils/formatDay';
import fToC from '../../utils/convertDeg';

const InfoDay = function ({ info, setIsOpen }) {
  const { infoAlert, day } = info;

  return (
    <div className='info'>
      <button className='closeModal' onClick={() => setIsOpen(null)}>
        ✕
      </button>

      <h2>
        {infoAlert ? '⚠️' : ''} {formatDay(day.datetime)} Info
      </h2>

      {infoAlert && (
        <div className='alertMessage'>
          <span>{infoAlert.event}</span>

          <p>{infoAlert.description}</p>

          <div>
            <span>Starts: {formatDay(infoAlert.onset)}</span>
            <span>Ends: {formatDay(infoAlert.ends)}</span>
          </div>
        </div>
      )}

      <span>{day.conditions}</span>

      <p>{day.description}</p>
      <p>
        <strong>Temps: </strong>
        {Math.round(fToC(day.tempmin))}°C —<strong>{Math.round(fToC(day.tempmax))}°C</strong>
      </p>
      <p>
        <span>
          {' '}
          <strong>Average Temps</strong> / 24h:{' '}
        </span>
        <strong>
          {Math.floor(fToC(day.hours.reduce((acc, cur) => acc + cur.temp, 0) / day.hours.length))}
          °C
        </strong>
      </p>
      <p>
        <strong>Feels likw: </strong>
        {Math.round(fToC(day.feelslike))}°C
      </p>

      <span>
        <strong>Sunrise</strong> {day.sunrise.slice(0, 5)} AM
      </span>
      <span>
        <strong>Sunset</strong> {day.sunset.slice(0, 5)} PM
      </span>
    </div>
  );
};

export default InfoDay;
