# redux-theme

_Decorate your components using themes_

**note:** early preview ! server side rendering currently not supported

## Installation

```
npm install --save redux-theme
```

## Usage

### Modify app structure

Using `redux-theme` add generally two new folders to your app structure:

```
└── src                      # Application source code
    ├── components           # Generic React Components (generally Dumb components)
    ├── styles               # Redux-theme styles definitions for components
    ├── themes               # Redux-theme definitions
    ├── reducers             # Redux reducers
    etc...
```

### Configure your store

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
app structure. Feel free to change the regex and default naming conventions.

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

### Theme

By convention, theme file must be named: `name-theme.js`
You can use, override and export the default `redux-theme`:
Colors and utilities is also provided.

```js
// /themes/custom-theme.js
import { Theme, Colors, ColorManipulator } from 'redux-theme';

const customTheme = new Theme ();
// Change some default theme properties
customTheme.typo.font = 'Luckiest Guy, sans-serif';
customTheme.palette.subTextColor = ColorManipulator.fade(Colors.white, 0.54);
export default customTheme;
```

### Styles

By convention, style file must be named: `MyComponent.styles.js`
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

### Theme switching

You can apply a new theme by dispatching the new theme name:
```js
import { applyTheme }  from 'redux-theme'

...

dispatch (applyTheme ('dark-theme'));
```
