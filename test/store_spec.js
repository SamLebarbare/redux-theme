'use strict';
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import Theme from '../src/defaultTheme';
import reducer from '../src/themeReducer';
import {createStore} from 'redux';
describe('StoreSpec -> class Theme', () => {

  it('self register', () => {
    const defaultTheme = new Theme ();
    const store = createStore (reducer);

    defaultTheme.register (store.dispatch);
    const state = store.getState ();

    expect(state).to.equal (fromJS ({
      currentTheme: 'not configured',
      themesRegistry: {
        'default': Map (defaultTheme)
      }
    }));
  });

  it('self apply', () => {
    const store = createStore (reducer);
    const defaultTheme = new Theme ();
    defaultTheme.register (store.dispatch);
    defaultTheme.apply (store.dispatch);
    const state = store.getState ();

    expect(state.get ('currentTheme')).to.equal ('default');
    expect(state).to.include.keys ('styles');
  });

});
