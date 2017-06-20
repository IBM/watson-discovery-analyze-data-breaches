import React from 'react';

const MAX_SIZE = 28;
const MIN_SIZE = 12;
let largest;
let ratio;
let computeSize;

export default React.createClass({
  displayName: 'cloud',
  propTypes: {
    data: React.PropTypes.array.isRequired,
    handleClick: React.PropTypes.func.isRequired,
  },

  render() {
    let props = this.props;
    largest = props.data ?
      props.data.reduce((prev, cur) => (cur.matching_results > prev ? cur.matching_results : prev), 0) :
      0;
    ratio = MAX_SIZE / largest;
    computeSize = (value) => Math.max(MIN_SIZE, value * ratio);
    return (
      <div className="top-entities--cloud">
        {
          props.data ?
            props.data.map((item, index) =>
              <div
                className="top-entities--word"
                key={`${index}-${item.key}`}
                title={item.matching_results}
                style={{
                  fontSize: `${computeSize(item.matching_results)}px`,
                  fontWeight: (computeSize(item.matching_results) < 13 ? 400 : null),
                }}
              >
                <a href="#" onClick={this.props.handleClick}>{item.key}</a>
              </div>) :
              []
        }
      </div>
    );
  }
});
