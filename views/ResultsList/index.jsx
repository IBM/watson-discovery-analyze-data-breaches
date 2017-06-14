import React from 'react';
import QuerySyntax from '../QuerySyntax/index.jsx';
import Detail from './Detail.jsx';
import queryBuilder from '../../query-builder.js';  // eslint-disable-line

export default React.createClass({
  displayName: 'ResultsList',
  propTypes: {
    items: React.PropTypes.array,
    query: React.PropTypes.shape({
      text: React.PropTypes.string,
      date: React.PropTypes.object,
    }),
  },

  getInitialState() {
    return {
      showQuery: false,
    };
  },

  onShowQuery() {
    this.setState({ showQuery: true });
  },

  onShowResults() {
    this.setState({ showQuery: false });
  },

  render() {
    return (
      <div>
        {!this.state.showQuery ? (
          <div className="results-list widget">
            <div className="widget--header">
              <h2 className="base--h2 widget--header-title">Results</h2>
              <div className="widget--header-spacer" />
              <button
                className="base--button widget--header-button"
                href="#" onClick={this.onShowQuery}
              >
                View Query
              </button>
            </div>

            <div>
              {this.props.items.length}
              {this.props.items.length === 1 ? ' result' : ' results'}
            </div>

            <ul>
              {this.props.items.map((item) =>
                <Detail key={item.id} item={item} />
              )}
            </ul>
          </div>
        ) : (
          <QuerySyntax
            title="Results"
            query={queryBuilder.build(this.props.query, true)}
            response={{results: this.props.items}}
            onGoBack={this.onShowResults}
          />
        ) }
      </div>
    );
  }});
