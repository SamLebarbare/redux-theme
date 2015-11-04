'use strict';
import React, {Component, PropTypes}  from 'react';
import { connect }   from 'react-redux';
import { load, applyTheme } from './themeReducer';

@connect (
  state => ({
    font: state.theme.get ('font'),
    canvasColor: state.theme.get ('canvasColor')
  }),
  dispatch => ({load, applyTheme, dispatch}))
export default class ReduxTheme extends Component {

  static propTypes = {
    stylesDir: PropTypes.string.isRequired,
    themesDir: PropTypes.string.isRequired,
    defaultTheme: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const {dispatch, stylesDir, themesDir, defaultTheme, applyTheme} = this.props;
    dispatch (load (defaultTheme, themesDir, stylesDir));
    dispatch (applyTheme (defaultTheme));
  }

  render() {
    const { font, canvasColor } = this.props;
    let ss    = document.getElementById ('reduxtheme');
    document.body.style.backgroundColor = canvasColor;
    if (!ss) {
      ss      = document.createElement ('link');
      ss.id   = 'reduxtheme';
      ss.type = 'text/css';
      ss.rel  = 'stylesheet';
      ss.href = 'http://fonts.googleapis.com/css?family=';
      ss.href += font.split (',')[0];
      document.getElementsByTagName ('head')[0].appendChild(ss);
      console.log ('@! injected googlefont');
    } else {
      ss.href = 'http://fonts.googleapis.com/css?family=';
      ss.href += font.split (',')[0];
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
