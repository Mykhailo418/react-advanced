import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import PeopleList from '../people/PeopleList';

class PeopleListPage extends Component{
	render(){
		return (
			<Fragment>
				<PeopleList />
			</Fragment>
		);
	}
}

export default PeopleListPage;