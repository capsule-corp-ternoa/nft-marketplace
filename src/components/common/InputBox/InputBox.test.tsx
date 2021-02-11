/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

describe('InputBox', () => {

  it('renders component properly', () => {
    console.log('to prepare');
  });
});