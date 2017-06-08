// Aggregations used to build the different parts of the UI
const entities = [
];

const sentiments = [
  'term(enriched_text.docSentiment.type)',
];

const mentions = [
];

module.exports = {
  aggregations: [].concat(entities, sentiments, mentions),
  entities,
  sentiments,
  mentions,
  build(query={}, full) {
    const params = {
      return: 'id,text,enriched_text',
    };
    if (query.text && query.text.length) {
      params.query = `"${query.text}"`;
    }
    if (full) {
      params.aggregations = [].concat(entities, sentiments, mentions);
    }
    return params;
  },
};
