import React from 'react';
import {render} from 'react-dom';
import store from './redux/store';
import Root from './components/Root';
import'../mocks';

// Styles
import '../scss/index.scss';

render(
	<Root store={store} />,
	document.getElementById('container')
);