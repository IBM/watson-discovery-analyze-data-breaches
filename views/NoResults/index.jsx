import React, { PropTypes } from 'react';

const NoResults = (props) => (
  <div style={{ width: '100%', textAlign: 'center', marginBottom: '5rem' }}>
    <p className="base--h2">There are no results.</p>
  </div>
);

NoResults.propTypes = {
  query: PropTypes.object,
};

export default NoResults;
