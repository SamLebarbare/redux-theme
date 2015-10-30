'use strict';

import { Map, fromJS } from 'immutable';
const APPLY_THEME  = 'redux-theme/APPLY_THEME';
const CONFIGURE    = 'redux-theme/CONFIGURE';

let stylesReq    = {};
let themesReq    = {};

function requireInPack (pack, file) {
  var fileId = pack.resolve (file);
  return  __webpack_require__ (fileId);
}

function buildTheme(themeName) {

  themeName  = './' + themeName + '.js';
  let e = {};
  let Theme     = requireInPack (themesReq, themeName);
  e.name        = themeName;
  e.typo        = Theme.typo;
  e.palette     = Theme.palette;
  e.colors      = Theme.colors;
  e.transitions = Theme.transitions;
  e.spacing     = Theme.spacing;
  e.shapes      = Theme.shapes;

  return e;
}

function setState(state, newState) {
  return state.merge (newState);
}

function buildStyle(style, theme) {
  return requireInPack (stylesReq, style)(theme);
}

function reloadStyles(theme) {
  let newStyle = {};
  stylesReq.keys ().forEach ((style) => {
    let componentName = style.replace ('./', '');
    componentName = componentName.replace ('.styles.js', '');
    newStyle[componentName] = buildStyle (style, theme);
  });
  return newStyle;
}

function reloadTheme (themeName) {
  let newState = {};
  let newTheme = buildTheme (themeName);
  newState.currentTheme = themeName;
  newState.font         = newTheme.typo.font;
  newState.canvasColor  = newTheme.palette.canvasColor;
  newState.styles       = reloadStyles (newTheme);
  return Map (fromJS (newState));
}

const initialState = Map(fromJS ({
    currentTheme: 'not configured',
    font: 'sans-serif',
    canvasColor: '#ffffff',
    styles: {}
  })
);

export default function themeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CONFIGURE:
    case APPLY_THEME:
      return setState (state, reloadTheme (action.theme));
    default:
      return state;
  }
}

export function applyTheme(name) {
  if (typeof name !== 'string') {
    throw new Error('applyTheme need a theme name as first argument');
  }
  return { type: APPLY_THEME, theme: name};
}

export function configure(themeContext, stylesContext, theme) {
  stylesReq = stylesContext;
  themesReq = themeContext;
  return { type: CONFIGURE, theme: theme };
}
