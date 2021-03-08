/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import renderer from 'react-test-renderer';
import SearchPage from './SearchPage';

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

const nftList = [
  {
    'id':1,
    'labels': [1, 2, 3],
    'name': 'my NFT 1',
    'quantity': '10 of 10',
    'price': '0.2',
    'image': 'https://picsum.photos/200/300',
    'views': 5201,
    'owner': 'mickael canu',
    'creator': 'inri',
    'collectionName': 'Test name'
  },
  {
    'id':2,
    'labels': [1, 2, 3],
    'name': 'my NFT 2',
    'quantity': '10 of 10',
    'price': '0.5',
    'image': 'https://picsum.photos/201/300',
    'views': 5201,
    'owner': 'mickael canu',
    'creator': 'inri',
    'collectionName': 'Test name'
  },
];

// Axios mock
jest.mock('axios');
const resp = { data: nftList };
axios.get.mockResolvedValue(resp);

// React-router-dom mock
const mockHistoryPush = jest.fn();
const mockSearch = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    search: mockSearch,
  }),
}));

describe('SearchPage snapshots', () => {

  test('SearchPage renders correctly', () => {

    const tree = renderer
      .create(
        <SearchPage setIsLoading={()=> jest.fn()} />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});