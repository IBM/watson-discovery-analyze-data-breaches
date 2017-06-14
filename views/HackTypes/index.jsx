import React from 'react';

export default React.createClass({
  displayName: 'HackTypes',

  propTypes: {
    query: React.PropTypes.shape({
      hackType: React.PropTypes.string,
    }),
    onQueryChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {selectedValue: 'all'};
  },

  handleChange(event) {
    let value = event.target.value;
    this.setState({selectedValue: value});
    this.props.onQueryChange({
      hackType: value
    });
  },

  render() {
    return (
      <div>
        <h2>HackTypes</h2>
        <select
          onChange={this.handleChange}
          value={this.state.selectedValue}>
          <option value="all">All</option>
          <option value="hacked">Hacked</option>
          <option value="accidentally published">Accidentally published</option>
          <option value="vulnerability">Vulnerability</option>
          <option value="leak">Leak</option>
          <option value="poor security">Poor security</option>
          <option value="configuration error">Configuration error</option>
          <option value="inside job">Inside job</option>
          <option value="lost / stolen computer">Lost / stolen computer</option>
          <option value="lost / stolen media">Lost / stolen media</option>
          <option value="inside job, hacked">Inside job, hacked</option>
        </select>
      </div>
    );
  }
});
