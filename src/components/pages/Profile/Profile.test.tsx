/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';

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

describe('Profile', () => {

  it('renders component properly', () => {
    render(<Profile setIsLoading={()=> jest.fn()} />);
    expect(screen.getByText('profile.displayName')).toBeInTheDocument();
  });

});