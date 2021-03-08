/* eslint-disable no-console */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CreateCollectiblePage from './CreateCollectiblePage';

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

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));


describe('CreateCollectiblePage snapshots', () => {

  test('CreateCollectiblePage renders correctly', () => {
    const tree = renderer
      .create(<CreateCollectiblePage />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('CreateCollectiblePage', () => {

  it('renders component properly', () => {
    render(<CreateCollectiblePage />);

    // Validate first button for creatingle single element
    const single = screen.getByText('createCollectible.single');
    expect(single).toBeInTheDocument();
    fireEvent.click(single);
    expect(mockHistoryPush).toHaveBeenCalledWith('/create-single-collectible');

    // Validate second button for creatingle multiple elements
    const multiple = screen.getByText('createCollectible.multiple');
    expect(multiple).toBeInTheDocument();
    fireEvent.click(multiple);
    expect(mockHistoryPush).toHaveBeenCalledWith('/create-multiple-collectible');
  
  });

});