import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import ResultsList from '../../../../views/ResultsList/index.jsx';

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

      wrapper = shallow(<ResultsList items={[snapchat, verizon]} />);
      assert.equal(wrapper.find('h2').text(), '2 results');
    });

  });
});
