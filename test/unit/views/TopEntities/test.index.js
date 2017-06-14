import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import TopEntities from '../../../../views/TopEntities/index.jsx';
import Cloud from '../../../../views/TopEntities/cloud.jsx';

describe('<TopEntities />', () => {
  let entities_sample = {
    field: 'enriched_text.entities.text',
    type: 'term',
    results: [
      {
        'key': 'Israel',
        'matching_results': 4
      },
      {
        'key': 'Abu Dhabi',
        'matching_results': 3
      },
      {
        'key': 'Arabic language',
        'matching_results': 3
      },
      {
        'key': 'Asia',
        'matching_results': 3
      },
      {
        'key': 'Far East',
        'matching_results': 3
      },
    ]
  };

  describe('When the TopEntities widget has content for some tabs', () => {
    let wrapper;
    let entities;

    beforeEach(() => {
      wrapper = shallow(<TopEntities entities={entities_sample} title='Entities' description='Extracted entities' />);
      entities = wrapper.find(Cloud).nodes[0].props.data;
    });

    it('Shows the Cloud component', () => {
      assert.equal(entities.length, 5);
    });

  });
});
