import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { personSelector } from '../../widgets/people';

class PersonDragPreview extends Component {
  static propTypes = {
    person: PropTypes.object.isRequired
  }

  render() {
    console.log(this.props.person)
    return <div>{this.props.person.fname}</div>
  }
}

function mapToProps(state, props){
  return {
    person: personSelector(state, props)
 };
}

 export default connect(mapToProps)(PersonDragPreview);
