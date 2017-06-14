import React from 'react';

export default React.createClass({
  displayName: 'Detail',
  propTypes: {
    item: React.PropTypes.object,
  },

  render() {
    let item          = this.props.item || {};
    let text          = item.text || '';
    let enriched_text = item.enriched_text || {};
    let entities      = enriched_text.entities || [];

    return (
      <div className="widget--detail">
        <h3>{this.props.item.title}</h3>
        <div className="widget--text">
          <p>{text}</p>
        </div>
        <div className="widget--entities">
          {entities.map((entity) =>
            <div>{entity.text} ({entity.type})</div>
          )}
        </div>
      </div>
    );
  }
});
