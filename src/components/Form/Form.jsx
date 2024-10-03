const Form = function ({ city, setCity }) {
  return (
    <form className='search'>
      <input
        type='text'
        value={city}
        placeholder='Search a location...'
        onChange={e => setCity(e.target.value)}
      />

      <button>Search</button>
    </form>
  );
};

export default Form;
