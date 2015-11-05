'use strict';
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import Theme from '../src/defaultTheme';
import reducer from '../src/themeReducer';

describe('ThemeSpec -> class Theme', () => {

  it('has default name', () => {
    const testTheme = new Theme ();

    expect(testTheme.name).to.equal('default');
  });

  it('construct name', () => {
    const testTheme = new Theme ('test');

    expect(testTheme.name).to.equal('test');
  });

  it('has default categories', () => {
    const testTheme = new Theme ();

    expect(testTheme).to.have.any.keys (
      'palette',
      'typo',
      'spacing',
      'shapes',
      'colors',
      'transitions'
    );
  });
});
