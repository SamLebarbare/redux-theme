'use strict';
import { connect } from 'react-redux';
import radium      from 'radium';

export default component => {
  return connect (state => {
    let styles;

    // handle serialized or immutable data
    if (typeof state.theme.get === 'function') {
      styles = state.theme.get('styles')[component.name];
    } else {
      styles = state.theme.styles[component.name];
    }

    if (!styles) {
      styles = {base: {}};
    }

    return {styles: styles};
  })(radium(component));
};
