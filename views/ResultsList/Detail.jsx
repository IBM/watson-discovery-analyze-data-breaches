import React from 'react';

export default React.createClass({
  displayName: 'Detail',
  propTypes: {
    item: React.PropTypes.object,
  },

  render() {
    return (
      <div className="widget--detail">
        <h3>{this.props.item.title}</h3>
        <div className="widget--text">
          <p>
            {this.props.item.text}
          </p>
        </div>
        <div className="widget--entities">
          Extracted Entities
        </div>
      </div>
    );
  }
});
