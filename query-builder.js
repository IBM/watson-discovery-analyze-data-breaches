// Aggregations used to build the different parts of the UI
const entities = [
  'term(enriched_text.entities.text)',
];

const keywords = [
  'term(enriched_text.keywords.text)',
];

const sentiments = [
  'term(enriched_text.sentiment.document.label)',
];

module.exports = {
  aggregations: [].concat(entities, keywords, sentiments),
  entities,
  keywords,
  sentiments,
  build(query={}, full) {
    let filters = [];
    const params = {
      count: 255,
      return: 'id,title,text,enriched_text.entities,method_of_leak,source_link,source_name,method_of_leak,no_of_records_stolen,year',
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

    if (query.entityTypes) {
      query.entityTypes.forEach((entity) => {
        filters.push(`enriched_text.entities.text:"${entity}"`);
      });
    }

    if (filters.length) {
      params.filter = filters.join(',');
    }

    return params;
  },
};
