import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import ResultsList from '../../../../views/ResultsList/index.jsx';
import Detail from '../../../../views/ResultsList/Detail.jsx';

describe('<ResultsList />', () => {
  let wrapper;
  let snapchat = {
    id: '101',
    title: 'Snapchat',
    text: 'Apr. Indian hackers apparently leaked data they stole last year in response to Snapchat CEO allegedly stating they had no plans to expand to \'poor countries\' like India. Snapchat have yet to confirm any leak.',
  };
  let verizon = {
    id: '102',
    title: 'Verizon',
    text: 'Customer database and information about company\'s security flaws stolen and put up for sale.',
  };

  describe('When there are no results', () => {
    it('Shows the number of results in the header', () => {
      wrapper = shallow(<ResultsList items={[]} />);
      assert.equal(wrapper.find('h2').text(), '0 results');
    });
  });

  describe('When there are results', () => {
    it('Shows the number of results in the header', () => {
      wrapper = shallow(<ResultsList items={[snapchat]} />);
      assert.equal(wrapper.find('h2').text(), '1 result');
      assert.equal(wrapper.find('Detail').length, 1);

      wrapper = shallow(<ResultsList items={[snapchat, verizon]} />);
      assert.equal(wrapper.find('h2').text(), '2 results');
      assert.equal(wrapper.find('Detail').length, 2);
    });

  });
});


describe('<Detail />', () => {
  let snapchat = {
    'title': 'Snapchat',
    'alternative_name': '',
    'text': 'Apr. Indian hackers apparently leaked data they stole last year in response to Snapchat CEO allegedly stating they had no plans to expand to \'poor countries\' like India. Snapchat have yet to confirm any leak.',
    'year': '2017',
    'organisation': 'app',
    'method_of_leak': 'hacked',
    'no_of_records_stolen': 1700000,
    'data_sensitivity': 1,
    'source_link': 'http://www.bgr.in/news/indian-hacker-group-leaks-data-of-1-7-million-snapchat-users-after-ceos-poor-country-comments-report/',
    'source_name': 'BGR',
    'enriched_text': {
      'entities': [{
        'count': 1,
        'sentiment': {
          'score': -0.621201,
          'mixed': false,
          'type': 'negative'
        },
        'text': 'CEO',
        'relevance': 0.877926,
        'type': 'JobTitle'
      }, {
        'count': 1,
        'disambiguated': {
          'opencyc': 'http://sw.opencyc.org/concept/Mx4rvVj7XJwpEbGdrcN5Y29ycA',
          'website': 'http://india.gov.in/',
          'name': 'India',
          'dbpedia': 'http://dbpedia.org/resource/India',
          'geo': '21.0,78.0',
          'ciaFactbook': 'http://www4.wiwiss.fu-berlin.de/factbook/resource/India',
          'freebase': 'http://rdf.freebase.com/ns/m.09c6w',
          'yago': 'http://yago-knowledge.org/resource/India',
          'subType': ['Location', 'HumanLanguage', 'Region', 'GovernmentalJurisdiction', 'FilmEditor']
        },
        'sentiment': {
          'mixed': false,
          'type': 'neutral'
        },
        'text': 'India',
        'relevance': 0.660828,
        'type': 'Country'
      }, {
        'count': 1,
        'sentiment': {
          'score': -0.621201,
          'mixed': false,
          'type': 'negative'
        },
        'text': 'Snapchat',
        'relevance': 0.584976,
        'type': 'Company'
      }, {
        'count': 1,
        'sentiment': {
          'score': -0.396417,
          'mixed': false,
          'type': 'negative'
        },
        'text': 'Snapchat',
        'relevance': 0.550474,
        'type': 'Person'
      }]
    },
  };

  it('Renders data fields', () => {
    let wrapper = shallow(<Detail item={snapchat} />);
    assert.equal(wrapper.find('h3').text(), 'Snapchat');
    assert.equal(wrapper.find('.widget--source a').prop('href'), 'http://www.bgr.in/news/indian-hacker-group-leaks-data-of-1-7-million-snapchat-users-after-ceos-poor-country-comments-report/');
    assert.equal(wrapper.find('.widget--type td').text(), 'hacked');
    assert.equal(wrapper.find('.widget--quantity td').text(), '1,700,000');
    assert.equal(wrapper.find('.widget--year td').text(), '2017');
  });
});
