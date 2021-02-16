/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NftDetailsPage from './NftDetailsPage';
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
    'collectionName': 'Test name',
  }
};

// Jest mock
jest.mock('axios');
const resp = { data: nft };
axios.get.mockResolvedValue(resp);

const detailsWithStates: React.FC = () => render( 
  <ContextProvider>
    <NftDetailsPage />
  </ContextProvider>
);

describe('NftDetailsPage snapshots', () => {

  test('NftDetailsPage renders correctly', () => {
    const tree = renderer
      .create(<detailsWithStates />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});


it('renders component properly', async () => {
  // detailsWithStates();
  // await screen.findByText('details.buy');

  // console.log(prettyDOM(div))
  // await findByText('details.owner');
    
    
});
