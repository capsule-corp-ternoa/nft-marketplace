/* eslint-disable no-console */
import React from 'react';
import renderer from 'react-test-renderer';
import { GoBack } from './Utils';


// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

describe('GoBack snapshots', () => {

  test('GoBack renders correctly', () => {
    const tree = renderer
      .create(<GoBack text="hehe" history="" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
