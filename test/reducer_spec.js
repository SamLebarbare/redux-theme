'use strict';
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer,
       {registerTheme, registerStyle, applyTheme} from '../src/themeReducer';

import testTheme from './themes_test/test-theme';
import testStyle from './styles_test/Test.styles.js';

describe('themeReducer', () => {

  it('initialize', () => {
    const nextState = reducer();

    expect(nextState).to.equal(fromJS ({
      currentTheme: 'not configured'
    }));
  });

  it('register theme `default-theme`', () => {
    const initialState = Map(fromJS ({
        currentTheme: 'not configured',
      })
    );

    const nextState = reducer(initialState, registerTheme ('default-theme', testTheme));

    expect(nextState).to.equal(fromJS ({
      currentTheme: 'not configured',
      registry: {
        themes: {
          'default-theme': testTheme
        }
      }
    }));
  });

  it('register style for Test component', () => {
    const initialState = Map(fromJS ({
        currentTheme: 'not configured'
      })
    );

    const nextState = reducer(initialState, registerStyle ('Test', testStyle));
    expect(nextState).to.equal(fromJS ({
      currentTheme: 'not configured',
      registry: {
        styles: {
          Test: testStyle
        }
      }
    }));
  });

  it('apply `default-theme`', () => {
    const actions = [
      registerTheme ('default-theme', testTheme),
      registerStyle ('Test', testStyle),
      applyTheme ('default-theme')
    ];


    const finalState = actions.reduce(reducer, Map())
    expect(finalState.get ('currentTheme')).to.equal ('default-theme');
    expect(finalState).to.include.keys ('styles');
  });

});
