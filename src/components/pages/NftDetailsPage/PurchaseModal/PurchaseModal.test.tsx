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

const closeModal= () => {
  console.log('will close modal');
};

describe('PurchaseModal', () => {

  it('renders component properly', () => {
    render(<PurchaseModal closeModal={closeModal} />);
    // expect(screen.getByText('You are about to purchase :')).toBeInTheDocument();

  });

});