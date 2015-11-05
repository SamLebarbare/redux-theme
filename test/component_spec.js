'use strict';
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import Theme from '../src/defaultTheme';
import reducer from '../src/themeReducer';
import {createStore, combineReducers} from 'redux';
import React from 'react';
import {renderIntoDocument, findRenderedDOMComponentWithTag} from 'react-addons-test-utils';
import ReduxTheme from '../src/ReduxTheme';
import testTheme from './themes_test/test-theme';
import testStyle from './styles_test/Test.styles.js';
import TestComponent from './components_test/Test';



describe('component_spec -> <ReduxTheme>', () => {

  const reducers = combineReducers({
    theme: reducer
  });

  const testTheme = new Theme ('test');
  testTheme.typo.font = 'Luckiest Guy, sans-serif';


  const testStyle = (theme) => ({
    base: {
      fontFamily: theme.typo.font
    }
  });


  const styles = [{
    componentName: 'Test',
    style: testStyle
  }];
  const store = createStore (reducers);

  renderIntoDocument (
    <ReduxTheme
      store={store}
      themes={[testTheme]}
      styles={styles}
      defaultTheme={'test'}/>
  );

  const component = renderIntoDocument (
    <TestComponent store={store} />
  );

  const node = findRenderedDOMComponentWithTag (component, 'div');

  it('set correct google font in header', () => {
    expect(document.getElementById ('reduxtheme').href).to
    .equal ('http://fonts.googleapis.com/css?family=Luckiest Guy');
  });

  it('Test component has correct style', () => {
    expect(node.style[0]).to
    .equal ('font-family');
  });

});
