import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { isAuthorizedSelector, moduleName } from '../../widgets/auth';
import NotAuthorized from '../routes/NotAuthorized';
import Loading from './Loading';

class ProtectedRoute extends Component {
  render() {
    const { isAuthorized, component, isLoading, ...rest } = this.props
    return <Route {...rest} render={this.getComponent} />
  }

  getComponent = () => {
    const { isAuthorized, isLoading, ...rest } = this.props;
    if(isLoading) return <Loading />;
    return isAuthorized ? <Route {...rest} /> : <NotAuthorized></NotAuthorized>;
  }
}

function mapToProps(state){
  return {
    isAuthorized: isAuthorizedSelector(state),
    isLoading: state[moduleName].loading
  };
}

export default connect(
  mapToProps,
  null,
  null,
  { pure: false }
)(ProtectedRoute);