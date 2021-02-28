/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ProfileTopPage from './ProfileTopPage';

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

// React-router-dom mock
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('ProfileTopPage snapshots', () => {

  test('ProfileTopPage renders correctly', () => {
    const tree = renderer
      .create(<ProfileTopPage setIsLoading={()=> jest.fn()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('ProfileTopPage', () => {

  it('renders component tabs properly', () => {
    render(<ProfileTopPage setIsLoading={()=> jest.fn()} />);
    expect(screen.getByText('profileTopPage.tab1')).toBeInTheDocument();
    expect(screen.getByText('profileTopPage.tab2')).toBeInTheDocument();
    expect(screen.getByText('profileTopPage.tab3')).toBeInTheDocument();
    expect(screen.getByText('profileTopPage.tab4')).toBeInTheDocument();
    expect(screen.getByText('profileTopPage.tab5')).toBeInTheDocument();
    expect(screen.getByText('profileTopPage.tab6')).toBeInTheDocument();
  });

  it('Redirect to profile page', () => {
    render(<ProfileTopPage setIsLoading={()=> jest.fn()} />);
    const profile = screen.getByText('Profile');
    expect(profile).toBeInTheDocument();
    fireEvent.click(profile);
    expect(mockHistoryPush).toHaveBeenCalledWith('/profile');
  });

  
});