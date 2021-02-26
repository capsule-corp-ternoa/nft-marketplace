import React from 'react';
import { render, screen } from '@testing-library/react';
import { Context } from '../../../utils/store/store';

import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  test('renders LoadingSpinner component', () => {

    const dispatch = jest.fn();
    const state = {
      isLoading:true,
    };
    
    render(
      <Context.Provider value={{ state, dispatch }}>
        <LoadingSpinner />
      </Context.Provider>
    );

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });
});