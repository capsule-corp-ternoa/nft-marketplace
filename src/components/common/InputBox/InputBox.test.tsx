/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { 
  InputBoxStandart, 
  InputBoxTextArea, 
  InputBoxToggle,
  InputBoxUpload,
  InputBoxSelect,
} from './InputBox';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

describe('All fields', () => {
  it('renders InputBoxStandart component properly', () => {
    render(<InputBoxStandart label="my label" subTitle="my subtitle" />);
    expect(screen.getByText('my label')).toBeInTheDocument();
    expect(screen.getByText('my subtitle')).toBeInTheDocument();
  });


  it('renders InputBoxTextArea component properly', () => {
    render(<InputBoxTextArea label="my label" subTitle="my subtitle" />);
    expect(screen.getByText('my label')).toBeInTheDocument();
    expect(screen.getByText('my subtitle')).toBeInTheDocument();
  });

  it('renders InputBoxToggle component properly', () => {
    render(<InputBoxToggle label="my label" subTitle="my subtitle" />);
    expect(screen.getByText('my label')).toBeInTheDocument();
    expect(screen.getByText('my subtitle')).toBeInTheDocument();
  });

  it('renders InputBoxUpload component properly', () => {
    render(<InputBoxUpload label="my label" subTitle="my subtitle" />);
    expect(screen.getByText('my label')).toBeInTheDocument();
    expect(screen.getByText('my subtitle')).toBeInTheDocument();
  });

  it('renders InputBoxSelect component properly', () => {
    render(<InputBoxSelect label="my label" subTitle="my subtitle" />);
    expect(screen.getByText('my label')).toBeInTheDocument();
    expect(screen.getByText('my subtitle')).toBeInTheDocument();
  });


});