/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Footer';

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

describe('Footer', () => {

  it('renders component properly', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    // render(<Footer />);
    expect(screen.getByText('footer.keepInTouch')).toBeInTheDocument();
  });

});