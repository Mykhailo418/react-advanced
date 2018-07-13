import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import App from './App';

class Root extends Component{
	static propTypes = {
		store: PropTypes.object
	}

	render(){
		return(
			<Provider store={this.props.store}>
				<App />
			</Provider>
		);
	}
}

export default Root;