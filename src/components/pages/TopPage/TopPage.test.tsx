/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import TopPage from './TopPage';
import ContextProvider from '../../../utils/store/store';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

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

const renderTopPageEmpty: React.FC = () => render( 
  <ContextProvider nftList={nftList}>
    <TopPage />
  </ContextProvider>
);

describe('TopPage', () => {
  it('renders component properly', () => {
    renderTopPageEmpty();
    expect(screen.getByText('Featured Creators')).toBeInTheDocument();
    // TODO validate nft injection in the page
    // expect(screen.getByText('Price')).toBeInTheDocument();

  });

});