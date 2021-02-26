/* eslint-disable no-console */
import React from 'react';
import renderer from 'react-test-renderer';
import { H1, H2, H3, H4, H5, SubTitle, GradientText } from './Title';


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

  test('H1 renders correctly', () => {
    const tree = renderer
      .create(<H1>test</H1>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('H2 renders correctly', () => {
    const tree = renderer
      .create(<H2>test</H2>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('H3 renders correctly', () => {
    const tree = renderer
      .create(<H3>test</H3>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('H4 renders correctly', () => {
    const tree = renderer
      .create(<H4>test</H4>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('H5 renders correctly', () => {
    const tree = renderer
      .create(<H5>test</H5>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('SubTitle renders correctly', () => {
    const tree = renderer
      .create(<SubTitle>test</SubTitle>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('GradientText renders correctly', () => {
    const tree = renderer
      .create(<GradientText>test</GradientText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  
  


});