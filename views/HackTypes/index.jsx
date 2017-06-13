import React from 'react';
import { RadioGroup, Radio } from 'watson-react-components';

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

  handleChange(value) {
    this.setState({selectedValue: value});
    this.props.onQueryChange({
      hackType: value
    });
  },

  render() {
    return (
      <div>
        <h2>HackTypes</h2>
        <RadioGroup tabStyle={true}
                    name="type-of-leak"
                    selectedValue={this.state.selectedValue}
                    onChange={this.handleChange}>
          <Radio value="all">All</Radio>
          <Radio value="hacked">Hacked</Radio>
          <Radio value="accidentally published">Accidentally published</Radio>
          <Radio value="vulnerability">Vulnerability</Radio>
          <Radio value="leak">Leak</Radio>
          <Radio value="poor security">Poor security</Radio>
          <Radio value="configuration error">Configuration error</Radio>
          <Radio value="inside job">Inside job</Radio>
          <Radio value="lost / stolen computer">Lost / stolen computer</Radio>
          <Radio value="lost / stolen media">Lost / stolen media</Radio>
          <Radio value="inside job, hacked">Inside job, hacked</Radio>
        </RadioGroup>
      </div>
    );
  }
});
