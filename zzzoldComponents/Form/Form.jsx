import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <input
          type='text'
          value={this.props.location}
          onChange={this.props.onSetLocation}
          placeholder='Search a location...'
          ref={this.props.inputRef}
        />
      </form>
    );
  }
}

export default Form;
