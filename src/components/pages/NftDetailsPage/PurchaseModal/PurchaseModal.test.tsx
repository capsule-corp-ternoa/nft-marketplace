/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import PurchaseModal from './PurchaseModal';

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

const closeModal= () => {
  console.log('will close modal');
};

const nft = {
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
};

describe('PurchaseModal', () => {

  it('renders component properly', () => {
    render(<PurchaseModal nft={nft} closeModal={closeModal} />);
    // expect(screen.getByText('You are about to purchase :')).toBeInTheDocument();

  });

});