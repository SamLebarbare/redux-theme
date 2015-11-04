import React, {Component, PropTypes}  from 'react';
import {connectTheme}                 from '../../src/';

@connectTheme
export default class Button extends Component {

  static propTypes = {
    styles: PropTypes.object.isRequired
  }

  render() {
    const {styles, kind, action, text} = this.props;
    return <div
      style={[
          styles.base,
          styles[kind]
        ]}
      onClick={action}
    >
      {text}
    </div>
  }
}
