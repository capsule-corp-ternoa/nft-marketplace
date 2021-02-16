/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import NftCard from './NftCard';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

const nft: NftListMockupType = {
  id: 1,
  labels: [1, 2, 3],
  name: 'my nft',
  quantity: 1,
  price: 1,
  image: '',
  view: 500,
  owner: 'johann',
  creator: 'johann',
  collectionName: 'my collection',
};

describe('NftCard', () => {

  it('renders component properly', () => {
    render(<NftCard nft={nft} />);
    expect(screen.getByAltText('nft-image')).toBeInTheDocument();
  });

});