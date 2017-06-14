import React from 'react';

export default React.createClass({
  displayName: 'Detail',
  propTypes: {
    item: React.PropTypes.object,
  },

  render() {
    return (
      <li>
        {this.props.item.title}
      </li>
    );
  }
});
