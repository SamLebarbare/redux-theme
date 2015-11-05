'use strict';
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer,
       {registerTheme, registerStyle, applyTheme} from '../src/themeReducer';
import Theme from '../src/defaultTheme';
import testTheme from './themes_test/test-theme';
import testStyle from './styles_test/Test.styles.js';

describe('ReducerSpec -> actions', () => {

  it('initialize', () => {
    const nextState = reducer();

    expect(nextState).to.equal(fromJS ({
      currentTheme: 'not configured'
    }));
  });

  it('register default theme', () => {
    const initialState = Map(fromJS ({
        currentTheme: 'not configured',
      })
    );
    const theme = new Theme ();
    const nextState = reducer(initialState, registerTheme (theme));

    expect(nextState).to.equal(fromJS ({
      currentTheme: 'not configured',
      themesRegistry: {
        default: Map (theme)
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
      stylesRegistry: {
        Test: testStyle
      }
    }));
  });

  it('apply `test-theme`', () => {
    const actions = [
      registerTheme (testTheme),
      registerStyle ('Test', testStyle),
      applyTheme ('test')
    ];


    const finalState = actions.reduce(reducer, Map())
    expect(finalState.get ('currentTheme')).to.equal ('test');
    expect(finalState).to.include.keys ('styles');
  });

});
