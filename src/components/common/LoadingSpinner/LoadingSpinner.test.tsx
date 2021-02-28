import React from 'react';
import { render, screen } from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  test('renders LoadingSpinner component', () => {    
    render(<LoadingSpinner />);
    expect(screen.getByText('loading....')).toBeInTheDocument();
  });
});