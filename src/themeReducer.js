'use strict';

import { Map, fromJS } from 'immutable';
const APPLY_THEME     = 'redux-theme/APPLY_THEME';
const REGISTER_THEME  = 'redux-theme/REGISTER_THEME';
const REGISTER_STYLE  = 'redux-theme/REGISTER_STYLE';

let __INPACK__ = false;
if (typeof __webpack_require__ !== undefined) {
  let __INPACK__ = true;
}

let stylesPack = {};

let stylesRegistry    = {};
let themesRegistry    = {};

function ls (location, regex) {
  var fs   = require ('fs');
  var listIn = fs.readdirSync (location);
  var listOut = [];

  listIn.forEach (function (item) {
    if (regex && !regex.test (item)) {
      return;
    }

    listOut.push (item);
  });

  return listOut;
}

function requireInPack (pack, file) {
  var fileId = pack.resolve (file);
  return  __webpack_require__ (fileId);
}

function setState(state, newState) {
  return state.merge (newState);
}

function reloadStyles (state, themeName) {
  let newStyles = {};
  let styles = state.getIn (['registry', 'styles']);
  let theme  = state.getIn (['registry', 'themes', themeName]);
  for (let [componentName, style] of styles.entries ()) {
    newStyles[componentName] = style (theme);
  }
  return newStyles;
}

function reloadTheme (state, themeName) {
  return state.set ('currentTheme', themeName)
              .setIn (['styles'], reloadStyles (state, themeName));
}



/*function configure (theme, stylesDir) {
  let styles = {};
  let themes = {};
  let stylesRegistry = {};
  let themesRegistry = {};

  if (__INPACK__) {
    stylesPack = require.context (stylesDir, false,  /\.styles\.js$/);
    styles = stylesPack.keys ();
    themes = require.context (themesDir, false,  /-theme.js$/).keys ();
  } else {
    styles = ls (stylesDir, /\.styles\.js$/);
    themes = ls (themesDir, /-theme.js$/);
  }

  themes.keys ().forEach ((theme) => {
    let themeName = theme.replace ('./', '');
    themeName = themeName.replace ('.js', '');
    if (__INPACK__) {
    } else {
      themesRegistry[themeName] = require (path.join (themesDir, theme));
    }
  });

  styles.keys ().forEach ((style) => {
    let componentName = style.replace ('./', '');
    componentName = componentName.replace ('.styles.js', '');
    if (__INPACK__) {
      stylesRegistry[componentName] = requireInPack (
        stylesPack, style
      )(themesRegistry[themeName]);
    } else {
      stylesRegistry[componentName] = require (
        path.join (stylesDir, style)
      )(themesRegistry[themeName]);
    }
  });

  return Map (fromJS ({
    currentTheme: themeName,
    styles: stylesRegistry,
    themes: themesRegistry
  }));
}*/


function addTheme (state, themeName, theme) {
  return state.setIn (['registry','themes', themeName], theme);
}

function addStyle (state, componentName, style) {
  return state.setIn (['registry','styles', componentName], style);
}

const initialState = Map(fromJS ({
    currentTheme: 'not configured'
  })
);

export default function themeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_STYLE:
      return addStyle (state, action.componentName, action.style);
    case REGISTER_THEME:
      return addTheme (state, action.themeName, action.theme);
    case APPLY_THEME:
      return reloadTheme (state, action.theme);
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

export function registerTheme(name, theme) {
  return { type: REGISTER_THEME, themeName: name, theme: theme};
}

export function registerStyle(component, style) {
  return { type: REGISTER_STYLE, componentName: component, style: style};
}
