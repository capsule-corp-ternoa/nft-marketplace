/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import TopPage from './TopPage';

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

const nftList = {
  nfts: [
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
  ]
};

// Axios mock
jest.mock('axios');
const resp = { data: nftList };
axios.get.mockResolvedValue(resp);

describe('TopPage snapshots', () => {


  it('TopPage renders correctly', () => {
    
    const tree = renderer
      .create(
        <TopPage setIsLoading={()=> jest.fn()} />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});


describe('TopPage', () => {
  it('renders component properly', () => {

    const setIsLoading = jest.fn();
    render(<TopPage setIsLoading={setIsLoading} />);

    expect(screen.getByText('topPage.categoryTitle')).toBeInTheDocument();
    expect(screen.getByText('topPage.topCollector')).toBeInTheDocument();
    expect(screen.getByText('topPage.popularCreations')).toBeInTheDocument();

    // TODO fix this text.. nft info not reachable
    // await expect(screen.findByText('my NFT 1')).toBeVisible()();
    

  });

});