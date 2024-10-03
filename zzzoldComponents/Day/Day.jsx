import React from 'react';

import { formatDay, getWeatherIcon } from '../fetchWeater';

class Day extends React.Component {
  render() {
    const { min, max, date, code, i } = this.props;

    return (
      <li className='day'>
        <span>{getWeatherIcon(code)}</span>
        <p>{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : formatDay(date)}</p>
        <p>
          {Math.round(min)}° — <strong>{Math.round(max)}°</strong>
        </p>
      </li>
    );
  }
}

export default Day;
