import React from 'react';
import QuerySyntax from '../QuerySyntax/index.jsx';
import Detail from './Detail.jsx';
import queryBuilder from '../../query-builder.js';  // eslint-disable-line
import Pagination from 'react-js-pagination';

export default React.createClass({
  displayName: 'ResultsList',
  propTypes: {
    items: React.PropTypes.array,
    query: React.PropTypes.shape({
      hackType: React.PropTypes.string,
    }),
  },

  getInitialState() {
    return {
      showQuery: false,
      currentPage: 1,
      itemsPerPage: 15,
    };
  },

  onShowQuery() {
    this.setState({
      showQuery: true,
      currentPage: 1,
      itemsPerPage: 15
    });
  },

  onShowResults() {
    this.setState({
      showQuery: false,
      currentPage: 1,
      itemsPerPage: 15
    });
  },

  handlePageChange(pageNumber) {
    this.setState({currentPage: pageNumber});
  },

  render() {
    const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
    const currentItems = this.props.items.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div>
        {!this.state.showQuery ? (
          <div>
            <div className="results-list widget">
              <div className="widget--header">
                <h2 className="base--h2 widget--header-title">
                  {this.props.items.length}
                  {this.props.items.length === 1 ? ' result' : ' results'}
                </h2>
                <div className="widget--header-spacer" />
                <button
                  className="base--button widget--header-button"
                  href="#" onClick={this.onShowQuery}
                >
                  View Query
                </button>
              </div>

              <div className="widget--list">
                {currentItems.map((item) =>
                  <Detail key={item.id} item={item} />
                )}
              </div>
            </div>

            <div>
              <Pagination
                hideDisabled
                prevPageText='prev'
                nextPageText='next'
                firstPageText='first'
                lastPageText='last'
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.itemsPerPage}
                totalItemsCount={this.props.items.length}
                pageRangeDisplay={5}
                onChange={this.handlePageChange}
              />
            </div>
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
