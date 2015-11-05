'use strict';
import React, {Component, PropTypes}  from 'react';
import { connect }   from 'react-redux';
import { Theme, registerTheme, registerStyle,  applyTheme } from './themeReducer';
import { Colors } from './utils/'
@connect (
  state => ({
    theme: state.theme.getIn (['themesRegistry', state.theme.get ('currentTheme')])
  }),
  dispatch => ({applyTheme, registerTheme, registerStyle, dispatch}),
  null,
  {pure: true})
export default class ReduxTheme extends Component {

  static propTypes = {
    defaultThemeName: PropTypes.string,
    styles: PropTypes.arrayOf(React.PropTypes.shape ({
      componentName: PropTypes.string,
      style: PropTypes.func
    })).isRequired,
    themes: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  configure() {
    const {
      dispatch,
      styles,
      themes,
      defaultTheme,
      applyTheme,
      registerStyle,
      registerTheme} = this.props;

    themes.forEach ((theme) => {
      dispatch (registerTheme (theme));
    });
    styles.forEach ((style) => {
      dispatch (registerStyle (style.componentName, style.style));
    });
    dispatch (applyTheme (defaultTheme));
  }

  componentWillMount() {
    this.configure ();
  }

  render() {
    const { theme } = this.props;
    if (theme) {
      const font = theme.getIn (['typo']).font
      const canvasColor = theme.getIn (['palette']).canvasColor;

      // set bgcolor from theme
      document.body.style.backgroundColor = canvasColor;

      // try to get reduxtheme element in DOM
      let ss    = document.getElementById ('reduxtheme');
      if (!ss) {
        // create google fonts css req.
        ss      = document.createElement ('link');
        ss.id   = 'reduxtheme';
        ss.type = 'text/css';
        ss.rel  = 'stylesheet';
        ss.href = 'http://fonts.googleapis.com/css?family=';
        ss.href += font.split (',')[0];
        document.getElementsByTagName ('head')[0].appendChild(ss);
      } else {
        // update google fonts css req.
        ss.href = 'http://fonts.googleapis.com/css?family=';
        ss.href += font.split (',')[0];
      }
    }

    const style = {
      display: 'none'
    };

    return (
      <div style={style} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}
