import { useState } from 'react';
import { Twemoji } from 'react-emoji-render';
import Day from '../Day/Day';
import InfoDay from '../InfoDay/InfoDay';

function countryCodeToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 0x1f1e6 + char.charCodeAt() - 65);

  return String.fromCodePoint(...codePoints);
}

const DisplayWeather = function ({ weather, areaInfo }) {
  const [isOpen, setIsOpen] = useState(null);
  const [info, setInfo] = useState(null);
  const { city, flag, country } = areaInfo;
  const { alerts, days } = weather;

  const openModal = function (id, info) {
    setIsOpen(isOpen !== id ? id : null);
    setInfo(info);
  };

  return (
    <>
      <div className='city'>
        <h2>
          Weather in {city}, {country}
        </h2>

        <Twemoji text={countryCodeToFlag(flag)} />
      </div>

      <ul className='weather'>
        {days.slice(0, 7).map((day, i) => (
          <Day key={day.datetime} alerts={alerts} day={day} onOpenModal={openModal} i={i} />
        ))}
      </ul>

      {isOpen && <InfoDay info={info} setIsOpen={setIsOpen} />}
    </>
  );
};

export default DisplayWeather;
