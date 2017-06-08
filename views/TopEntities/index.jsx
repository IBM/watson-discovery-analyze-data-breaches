import React, { PropTypes } from 'react';
import Cloud from './cloud.jsx';
import QuerySyntax from '../QuerySyntax/index.jsx';
import queryBuilder from '../../query-builder.js';  // eslint-disable-line
import NoContent from '../NoContent/index.jsx';

export default React.createClass({
  displayName: 'TopEntities',

  propTypes: {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    entities: PropTypes.object.isRequired,
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
          <div className="top-entities widget">
            <div className="widget--header">
              <h2 className="base--h2 widget--header-title">{this.props.title}</h2>
              <div className="widget--header-spacer" />
              <button
                className="base--button widget--header-button"
                href="#" onClick={this.onShowQuery}
              >
                View Query
              </button>
            </div>
            <p className="base--p top-entities--description">
              {this.props.description}
            </p>
            {this.props.entities.results.length > 0 ? (
              <Cloud data={this.props.entities.results} />
            ) : (
              <NoContent
                query={this.props.query}
                message={'No Topics found.'}
              />
            )
            }

          </div>
        ) : (
          <QuerySyntax
            title="Top Entities"
            query={queryBuilder.build(this.props.query, true)}
            response={this.props.entities}
            onGoBack={this.onShowResults}
          />
        )
      }
      </div>
    );
  },
});
