/* eslint-disable no-console */
import React from 'react';
import renderer from 'react-test-renderer';
import { RoundedSpan, SquaredSpan } from './Shapes';


// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

describe('Shapes snapshots', () => {

  test('RoundedSpan renders correctly', () => {
    const tree = renderer
      .create(<RoundedSpan />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('SquaredSpan renders correctly', () => {
    const tree = renderer
      .create(<SquaredSpan />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});