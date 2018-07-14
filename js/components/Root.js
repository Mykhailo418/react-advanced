import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import App from './App';
import history from '../history';

class Root extends Component{
	static propTypes = {
		store: PropTypes.object
	}

	render(){
		return(
			<Provider store={this.props.store}>
				<ConnectedRouter history={history} >
					<App />
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default Root;