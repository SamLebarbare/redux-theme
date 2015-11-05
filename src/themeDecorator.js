'use strict';
import { connect } from 'react-redux';
import radium      from 'radium';

export default component => {
  return connect (state => {
    let styles = state.theme.get('styles')[component.name];
    if (!styles) {
      styles = {base: {}};
    }
    return {styles: styles};
  })(radium(component));
};
