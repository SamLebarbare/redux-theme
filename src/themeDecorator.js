'use strict';
import { connect } from 'react-redux';
import { fromJS }  from 'immutable';
import radium      from 'radium';

export default component => {
  return connect (state => ({
    styles: state.theme.getIn (['styles',component.name], fromJS ({base: {}})).toJS()
  }))(radium(component));
}
