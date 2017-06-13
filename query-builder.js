// Aggregations used to build the different parts of the UI
const entities = [
  'term(enriched_text.entities.text)',
];

const keywords = [
  'term(enriched_text.keywords.text)',
];

const sentiments = [
  'term(enriched_text.docSentiment.type)',
];

module.exports = {
  aggregations: [].concat(entities, keywords, sentiments),
  entities,
  keywords,
  sentiments,
  build(query={}, full) {
    const params = {
      return: 'id,title,text,enriched_text',
    };
    if (query.text && query.text.length) {
      params.query = `"${query.text}"`;
    }
    if (full) {
      params.aggregations = [].concat(entities, keywords, sentiments);
    }
    return params;
  },
};
