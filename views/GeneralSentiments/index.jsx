import React from 'react';
import SentimentChart from './SentimentChart.jsx';
import QuerySyntax from '../QuerySyntax/index.jsx';
import queryBuilder from '../../query-builder.js';  // eslint-disable-line

export default React.createClass({
  displayName: 'GeneralSentiments',

  propTypes: {
    sentiment: React.PropTypes.object.isRequired,
    query: React.PropTypes.shape({
      hackType: React.PropTypes.string,
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
          <div className="sentiment widget">
            <div className="widget--header">
              <h2 className="base--h2 widget--header-title">General Sentiments</h2>
              <div className="widget--header-spacer" />
              <button
                className="base--button widget--header-button"
                href="#" onClick={this.onShowQuery}
              >
                View Query
              </button>
            </div>
            <p className="base--p sentiment--description">
              Enriched with sentiment analysis
            </p>
            <SentimentChart sentiment={this.props.sentiment} showLabels size="large" />
          </div>
        ) : (
          <QuerySyntax
            title="Sentiment Analysis"
            query={queryBuilder.build(this.props.query, true)}
            response={{ sentiment: this.props.sentiment }}
            onGoBack={this.onShowResults}
          />
        )
      }
      </div>
    );
  },
});
