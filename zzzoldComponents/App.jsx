import React from 'react';
import DisplayWeather from './DisplayWeather/DisplayWeather.jsx';
import Form from './Form/Form.jsx';

class App extends React.Component {
  state = {
    location: '',
    isLoading: false,
    displayLocation: { city: '', flag: '' },
    weather: {},
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  fetchWeather = async e => {
    if (this.state.location.length < 3) return;

    try {
      this.setState({ isLoading: true });
      // prettier-ignore
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`);

      if (!geoRes.ok) throw new Error('Something went wrong');

      const geoData = await geoRes.json();

      console.log(geoData);

      if (!geoData.results) throw new Error('Location not found');

      const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0);

      this.setState({ displayLocation: { city: name, flag: country_code.toLowerCase() } });

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );

      const weatherData = await weatherRes.json();

      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setLocation = e => this.setState({ location: e.target.value });

  componentDidMount() {
    this.setState({ location: localStorage.getItem('location') || '' });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) this.fetchWeather();

    localStorage.setItem('location', this.state.location);
  }

  render() {
    return (
      <div className='app'>
        <h1>Classy Weather</h1>

        <Form
          location={this.state.location}
          onSetLocation={this.setLocation}
          inputRef={this.inputRef}
        />

        {this.state.isLoading && <p className='loader'>Loading...</p>}

        {this.state.weather?.weathercode && (
          <DisplayWeather
            weather={this.state.weather}
            flag={this.state.displayLocation.flag}
            city={this.state.displayLocation.city}
          />
        )}
      </div>
    );
  }
}

export default App;
