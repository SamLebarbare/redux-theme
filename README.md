# redux-theme v0.3.0

_Decorate your components using themes_

**note: early preview ! wait for 1.0.0 before using**

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
### Provide theme via ReduxTheme component

The ReduxTheme component responsible of :

On mount:

- Registering your themes
- Registering your styles
- Applying the first theme

On theme change:

- Update googlefont from theme
- Update body.backgroundColor from theme

Exemple:

```js
import { ReduxTheme } from 'redux-theme';

/// Some themes...
const baseTheme = new Theme ('base');
const myTheme = new Theme ('mytheme');
myTheme.typo.font = 'Luckiest Guy, sans-serif';

const textStyle = (theme) => ({
  base: {
    fontFamily: theme.typo.font
  }
});


// Build array of themes and styles
const themes = [defaultTheme, myTheme];
const styles = [{
  componentName: 'Text',
  style: textStyle
}];

export default class Root extends Component {
  render() {
    const {store} = this.props;
    return (
      <div>

        <ReduxTheme
          store={store}
          themes={themes}
          styles={styles}
          defaultTheme={'mytheme'} />

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

### Theme class

You can use, override and export the default `redux-theme`:
Colors and utilities is also provided.

#### new Theme (<theme name>)

```js
// /themes/custom-theme.js
import { Theme, Colors, ColorManipulator } from 'redux-theme';

const customTheme = new Theme ('custom');
// Change some default theme properties
customTheme.typo.font = 'Luckiest Guy, sans-serif';
customTheme.palette.subTextColor = ColorManipulator.fade(Colors.white, 0.54);
export default customTheme;
```

#### Available methods

A theme can register and apply if you provide the dispatch func.

```js
const customTheme = new Theme ('custom');
// Change some default theme properties
// ...
const {dispatch} = this.props;
customTheme.register (dispatch);
customTheme.apply (dispatch);
```

### Styles

A style file is a function receiving the current theme as argument.
Style file is using `radium` convention for applying a `kind`.

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
## Reducer actions

## Registering themes and styles

You must register your themes and styles before applying a theme.
Exemple in webpack:

```js
import { registerTheme,  registerStyle}  from 'redux-theme'

```

### registerTheme (<theme object>)

```js
const defaultTheme = new Theme ();

// register
dispatch (registerTheme defaultTheme));
```

### registerStyle (<component name>, <style function>)

```js
dispatch (registerStyle ('MyComponent', myComponentStyle));
```

### applyTheme (<theme name>)

You can apply a new theme by dispatching the new theme name:
```js
import { applyTheme }  from 'redux-theme'

...

dispatch (applyTheme ('dark-theme'));
```
