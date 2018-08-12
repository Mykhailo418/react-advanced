import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect } from 'react-router-dom';
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import ProtectedRoute from './common/ProtectedRoute';

class App extends Component{
	static propTypes = {

	}

	render(){
		return(
			<div className="container">
				<Switch>
					<ProtectedRoute path="/admin" component={AdminPage} />
					<Route path="/auth" component={AuthPage} />
					<Redirect to="/auth" />
				</Switch>
			</div>
		);
	}
}

export default App;
