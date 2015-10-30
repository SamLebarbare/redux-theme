# redux-theme

_Decorate your components using themes_
**note:** early preview !

## Installation

```
npm install --save redux-theme
```

## Usage

### App structure
Using `redux-theme` add generally two new folders to your app structure:

```
├── styles               # Redux-theme styles definitions for components
├── themes               # Redux-theme definitions
```

```
└── src                      # Application source code
    ├── components           # Generic React Components (generally Dumb components)
    ├── containers           # Components that provide context (e.g. Redux Providers)
    ├── layouts              # Components that dictate major page structure
    ├── reducers             # Redux reducers
    ├── routes               # Application route definitions
    ├── stores               # Redux store configuration  
    ├── styles               # Redux-theme styles definitions for components
    ├── themes               # Redux-theme definitions
    ├── utils                # Generic utilities
    ├── views                # Components that live at a route
    └── index.js             # Application bootstrap and rendering
```

### Store configuration
Like other reducers, `theme:` is required in app state shape.

```js
import { combineReducers }         from 'redux';
import { routerStateReducer }      from 'redux-router';
import { themeReducer }            from 'redux-theme';

export default combineReducers({
  theme: themeReducer,
  router: routerStateReducer
});
```

### In you root container

We use `ReduxTheme` to configure the theme state with default props.

**note:** we use webpack `require.context` to inject styles and themes from your
app structure.

```js
import { ReduxTheme } from 'redux-theme';

/// STYLES AND THEMES FOLDERS
const stylesContext = require.context ('../styles/', true, /^((?![\\/]node_modules[\\/]).)*\\.styles\.js/);
const themesContext = require.context ('../themes/', true, /^((?![\\/]node_modules[\\/]).)*\-theme\.js/);

export default class Root extends Component {
  render() {
    const {store} = this.props;
    return (
      <div>
        <ReduxTheme
          store={store}
          themesContext={themesContext}
          stylesContext={stylesContext}
          defaultTheme={'default-theme'} />
        <Provider store={store}>
          <ReduxRouter>
            {routes}
          </ReduxRouter>
        </Provider>
      </div>
    );
}
```

### Decorate your components

Connect you components using `@connectTheme` decorator.
Your component will receive a `styles` props. with `radium` styles.

**note:** The component class name is used for resolution of styles,
in this case, it will look for a Button.styles.js in your `stylesContext` folder.

```js
import React, {Component, PropTypes}  from 'react';
import {connectTheme}                 from 'redux-theme';

@connectTheme
export default class Button extends Component {

  static propTypes = {
    styles: PropTypes.object.isRequired
  }

  render() {
    const {styles, kind, action, text} = this.props;
    return <button
      style={[
          styles.base,
          styles[kind]
        ]}
      onClick={action}
    >
      {text}
    </button>
  }
}
```

### Styles and themes

Style file is using `radium` convention for applying a `kind`.
A style file is a function receiving the current theme as argument.

```js
export default (theme) => {
  return {
    base: {
      display: 'inline-block',
      fontSize: '18px',
      fontFamily: theme.typo.font,
      fontWeight: 400,
      textTransform: 'uppercase',
      cursor: 'pointer',
      userSelect: 'none',
      outline: 'none',
      marginTop: '3px',
      minWidth: theme.spacing.desktopKeylineIncrement * 2,
      border: 'none',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '5px',
      paddingBottom: '5px',
      color: theme.palette.textColor,
      backgroundColor: theme.palette.primary1Color,
      borderRadius: theme.shapes.defaultBorderRadius,
      ':hover': {
        backgroundColor: theme.palette.primary3Color,
      },
      ':focus': {
        backgroundColor: theme.palette.primary3Color,
      },
      ':active': {
        backgroundColor: theme.palette.primary3Color,
      }
    },
    small: {
      paddingLeft: '15px',
      paddingRight: '15px'
    },
    accept: {
      fontWeight: 'bold',
    },
    cancel: {
      fontStyle: 'italic',
    }
  }
};
```

Theme file must export a convential shape:
**note:** Theme pack will be released soon

```js
export default {
  spacing: Spacing,
  typo: {
    font: 'Roboto, sans-serif',
    small: '12px',
    normal: '16px',
    big: '24px'
  },
  shapes: {
    defaultBorderRadius: '2px'
  },
  palette: {
      primary1Color: Colors.lightBlue500,
      primary2Color: Colors.lightBlue700,
      primary3Color: Colors.lightBlue100,
      accent1Color:  Colors.pinkA200,
      accent2Color:  Colors.pinkA400,
      accent3Color:  Colors.pinkA100,
      textColor:     Colors.darkBlack,
      subTextColor:  ColorManipulator.fade(Colors.darkBlack, 0.54),
      canvasColor:   Colors.white,
      paperColor:    Colors.white,
      borderColor:   Colors.grey300,
      disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
  },
  colors: Colors,
  transitions: Transitions
};
```

### Theme switching

You can apply a new theme by dispatching the new theme name:
```js
import { applyTheme }  from 'redux-theme'

...

dispatch (applyTheme ('dark-theme'));
```
