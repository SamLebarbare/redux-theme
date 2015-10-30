'use strict';
import React, {Component, PropTypes}  from 'react';
import { connect }   from 'react-redux';
import { configure } from './themeReducer';

@connect (
  state => ({
    font: state.theme.get ('font'),
    canvasColor: state.theme.get ('canvasColor')
  }),
  dispatch => ({configure, dispatch}))
export default class ReduxTheme extends Component {

  static propTypes = {
    stylesContext: PropTypes.func.isRequired,
    themesContext: PropTypes.func.isRequired,
    defaultTheme: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const {dispatch, stylesContext, themesContext, defaultTheme} = this.props;
    dispatch (configure (themesContext, stylesContext, defaultTheme));
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
