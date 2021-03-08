/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NftDetailsPage from './NftDetailsPage';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const nft = {
  nft: {
    'id':1,
    'labels': [1, 2, 3],
    'name': 'my NFT 1',
    'quantity': '10 of 10',
    'price': '0.2',
    'image': 'https://picsum.photos/200/300',
    'views': 5201,
    'owner': 'mickael canu',
    'creator': 'inri',
    'collectionName': 'Test name collection',
    'ownerPicture': 'owner.jpg',
    'creatorPicture': 'creator.jpg',
  }
};

// Axios mock
jest.mock('axios');
const resp = { data: nft };
axios.get.mockResolvedValue(resp);

describe('NftDetailsPage snapshots', () => {

  test('NftDetailsPage renders correctly', () => {
    const tree = renderer
      .create(<NftDetailsPage setIsLoading={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});


it('renders component properly', () => {

  render(<NftDetailsPage setIsLoading={false} />);
  screen.findByText('details.buy');

  screen.findByText('0.2');

  // owner displayed
  screen.findByText('mickael canu');
  // creator displayed
  screen.findByText('inri');
  // owner picture displayed
  screen.findByText('owner.jpg');
  // creator picture displayed
  screen.findByText('creator.jpg');
  //  collection name displayed
  screen.findByText('Test name collection');
  // views displayed
  screen.findByText('5201');

    
});
