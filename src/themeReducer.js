'use strict';

import { Map, fromJS } from 'immutable';
const APPLY_THEME     = 'redux-theme/APPLY_THEME';
const REGISTER_THEME  = 'redux-theme/REGISTER_THEME';
const REGISTER_STYLE  = 'redux-theme/REGISTER_STYLE';

function reloadStyles (state, themeName) {
  let newStyles = {};
  let styles = state.getIn (['stylesRegistry']);
  let theme  = state.getIn (['themesRegistry', themeName]);
  if (!styles || !theme) {
    return {};
  }
  for (let [componentName, style] of styles.entries ()) {
    newStyles[componentName] = style (theme.toJS ());
  }
  return newStyles;
}

function reloadTheme (state, themeName) {
  return state.set ('currentTheme', themeName)
              .setIn (['styles'], reloadStyles (state, themeName));
}

function addTheme (state, theme) {
  return state.setIn (['themesRegistry', theme.name], Map (fromJS (theme)));
}

function addStyle (state, componentName, style) {
  return state.setIn (['stylesRegistry', componentName], style);
}

const initialState = Map(fromJS ({
    currentTheme: 'not configured'
  })
);

export default function themeReducer (state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_STYLE:
      return addStyle (state, action.componentName, action.style);
    case REGISTER_THEME:
      return addTheme (state, action.theme);
    case APPLY_THEME:
      return reloadTheme (state, action.theme);
    default:
      return state;
  }
}

export function applyTheme (name) {
  if (typeof name !== 'string') {
    throw new Error('applyTheme need a theme name as first argument');
  }
  return { type: APPLY_THEME, theme: name};
}

export function registerTheme (theme) {
  return { type: REGISTER_THEME, theme: theme};
}

export function registerStyle (component, style) {
  return { type: REGISTER_STYLE, componentName: component, style: style};
}
