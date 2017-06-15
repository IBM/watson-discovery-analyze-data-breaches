import 'whatwg-fetch';
import React from 'react';
import { Icon } from 'watson-react-components';

import HackTypes from './HackTypes/index.jsx';
import TopEntities from './TopEntities/index.jsx';
import GeneralSentiments from './GeneralSentiments/index.jsx';
import NoResults from './NoResults/index.jsx';
import ResultsList from './ResultsList/index.jsx';

const parseQueryResults = (data) => {
  const parsedData = {
    results: data.results, // Top Results
    entities: null, // Top entities
    keywords: null, // Top keywords
    sentiment: null, // Overall sentiment
  };

  data.aggregations.forEach((aggregation) => {
    // Overall sentiment
    if (aggregation.type === 'term' && (aggregation.field === 'enriched_text.docSentiment.type')) {
      parsedData.sentiment = aggregation;
    }

    if (aggregation.type === 'term' && (aggregation.field === 'enriched_text.entities.text')) {
      parsedData.entities = aggregation;
    }

    if (aggregation.type === 'term' && (aggregation.field === 'enriched_text.keywords.text')) {
      parsedData.keywords = aggregation;
    }
  });

  return parsedData;
};

export default React.createClass({
  displayName: 'Demo',

  getInitialState() {
    return {
      query: null,  // object that has text and date
      error: null,
      data: null,
      loading: false,
    };
  },

  componentDidMount() {
    this.fetchNewData();
  },

  handleQueryChange(query) {
    this.fetchNewData(query);
  },
  /**
   * Call the query API every time the query change.
   */
  fetchNewData(query={}) {
    this.setState({ query, loading: true });
    fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    })
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((json) => {
            this.setState({ loading: false, data: parseQueryResults(json) });
          });
      } else {
        response.json()
        .then((error) => this.setState({ error, loading: false }))
        .catch((errorMessage) => {
          // eslint-disable-next-line no-console
          console.error(errorMessage);
          this.setState({
            error: { error: 'There was a problem with the request, please try again' },
            loading: false,
          });
        });
      }
    });
    // scroll to the loading bar
    window.scrollTo(100, 344);
  },

  render() {
    return (
      <div>
        <HackTypes onQueryChange={this.handleQueryChange} query={this.state.query} />
        { this.state.loading ?
          (
            <div className="results">
              <div className="loader--container">
                <Icon type="loader" size="large" />
              </div>
            </div>) : null }
        { !this.state.loading && this.state.data && this.state.data.results.length > 0 ? (
          <div className="results">
            <div className="_container _container_large">
              <div className="row">
                <div className="results--panel-1">
                  <TopEntities
                    query={this.state.query}
                    entities={this.state.data.entities}
                    onShowCode={this.toggleTopEntities}
                    title="Top Entities"
                    description="Enriched with entity extraction"
                  />
                </div>
                <div className="results--panel-2">
                  <GeneralSentiments
                    query={this.state.query}
                    sentiment={this.state.data.sentiment}
                  />
                </div>
              </div>

              <div className="row">
                <div className="results--panel-3">
                  <ResultsList query={this.state.query} items={this.state.data.results} />
                </div>
              </div>
            </div>
          </div>
        ) : null }
        { !this.state.loading && this.state.data && this.state.data.results.length === 0 ?
          <NoResults query={this.state.query} /> :
          null }
      </div>
    );
  },
});
