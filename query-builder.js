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
    let filters = [];
    const params = {
      count: 300,
      return: 'id,title,text,enriched_text,method_of_leak',
    };
    if (query.text && query.text.length) {
      params.query = `"${query.text}"`;
    }
    if (full) {
      params.aggregations = [].concat(entities, keywords, sentiments);
    }

    if (query.hackType && query.hackType !== 'all') {
      filters.push(`method_of_leak:"${query.hackType}"`);
    }

    if (filters.length) {
      params.filter = filters.join(',');
    }

    return params;
  },
};
