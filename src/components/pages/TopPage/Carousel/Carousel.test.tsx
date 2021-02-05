/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

const nftList = [
  {
    id: 1,
    labels: [1, 2, 3],
    name: 'my NFT 1',
    quantity: '10 of 10',
    price: '0.2',
    image: 'https://picsum.photos/200/300',
    views: 5201,
    owner: 'mickael canu',
    creator: 'inri',
    collectionName: 'Test name'
  },
  {
    id: 2,
    labels: [1, 2, 3],
    name: 'my NFT 2',
    quantity: '10 of 10',
    price: '0.5',
    image: 'https://picsum.photos/201/300',
    views: 5201,
    owner: 'mickael canu',
    creator: 'inri',
    collectionName: 'Test name'
  },
];

describe('Carousel', () => {

  it('renders component properly', () => {
    render(<Carousel nftList={nftList} />);
    // TODO
    // expect(screen.getByText('price')).toBeInTheDocument();

  });

});