import Wrapper from './Wrapper/Wrapper';
import NavBar from './NavBar/NavBar';
import Logo from './Logo/Logo';
import Form from './Form/Form';
import Message from './Message/Message';
import DisplayWeather from './DisplayWeather/DisplayWeather';
import useAPIWeather from '../Hooks/useAPIWeather';

const App = function () {
  const { city, error, isLoading, weather, areaInfo, setCity } = useAPIWeather();

  return (
    <Wrapper className='app'>
      <NavBar>
        <Logo />
        <Form city={city} setCity={setCity} />
      </NavBar>

      <Wrapper className='content'>
        {error && <Message className='error'>{error}</Message>}
        {isLoading && !error && <Message className='loader'></Message>}
        {weather && !isLoading && !error && (
          <DisplayWeather weather={weather} areaInfo={areaInfo} />
        )}
      </Wrapper>
    </Wrapper>
  );
};

export default App;
