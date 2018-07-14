import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { isAuthorizedSelector } from '../../widgets/auth';
import NotAuthorized from '../routes/NotAuthorized';

class ProtectedRoute extends Component {
  render() {
    const { isAuthorized, component, ...rest } = this.props
    return <Route {...rest} render={this.getComponent} />
  }

  getComponent = () => {
    const { isAuthorized, ...rest } = this.props;
    return isAuthorized ? <Route {...rest} /> : <NotAuthorized></NotAuthorized>;
  }
}

function mapToProps(state){
  return {
    isAuthorized: isAuthorizedSelector(state)
  };
}

export default connect(
  mapToProps,
  null,
  null,
  { pure: false }
)(ProtectedRoute);