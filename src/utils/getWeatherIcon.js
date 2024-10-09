const weatherToEmoji = icon => {
  switch (icon) {
    case 'clear-day':
      return '☀️'; // Sunny
    case 'clear-night':
      return '🌕'; // Clear night
    case 'partly-cloudy-day':
      return '🌤️'; // Partly cloudy day
    case 'partly-cloudy-night':
      return '🌥️'; // Partly cloudy night
    case 'cloudy':
      return '☁️'; // Cloudy
    case 'rain':
      return '🌧️'; // Rainy
    case 'snow':
      return '❄️'; // Snowy
    case 'wind':
      return '💨'; // Windy
    case 'fog':
      return '🌫️'; // Foggy
    case 'thunderstorm':
      return '⛈️'; // Thunderstorm
    case 'tornado':
      return '🌪️'; // Tornado
    default:
      return '❓'; // Unknown condition
  }
};

export default weatherToEmoji;
