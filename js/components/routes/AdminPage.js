import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, NavLink, Switch} from 'react-router-dom';
import AddPersonForm from '../people/AddPersonForm';
import {connect} from 'react-redux';
import { addPerson } from '../../widgets/people';

class AdminPage extends Component{
	static propTypes = {
		match: PropTypes.object
	}

	render(){
		const {match} = this.props;
		return(
			<section>
				<h1>Admin Page</h1>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
				    <ul className="navbar-nav">
					    <li className="nav-item">
						   	<NavLink to={`${match.path}/add-person`} activeClassName="active" className="nav-link">
								Add Person
							</NavLink>
					    </li>
				    </ul>
				</nav>
				<Switch>
					<Route path={`${match.path}/add-person`} render={this.getAddPersonForm} />
				</Switch>
			</section>
		);
	}

	getAddPersonForm = () => {
		return <AddPersonForm onSubmit={this.handleSubmit} />
	}

	handleSubmit = (props_submit) => {
		const {fname, lname, email} = props_submit;
		console.log('-- Add Person Form:', props_submit);
		this.props.addPerson({fname, lname, email});
		return false;
	}
}

export default connect(null, {addPerson})(AdminPage);