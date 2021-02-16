import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

test('renders learn react link', () => {
  render(
    <App />
  );
  return screen.getAllByText(/Ternoa Stamp/i).toBeInTheDocument;
  
});
