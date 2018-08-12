import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import App from './App';
import history from '../history';
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class Root extends Component{
	static propTypes = {
		store: PropTypes.object
	}

	render(){
		return(
			<Provider store={this.props.store}>
				<ConnectedRouter history={history} >
					<DragDropContextProvider backend={HTML5Backend}>
						<App />
					</DragDropContextProvider>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default Root;
