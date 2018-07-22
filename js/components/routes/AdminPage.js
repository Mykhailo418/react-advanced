import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, NavLink, Switch} from 'react-router-dom';
import AddPersonForm from '../people/AddPersonForm';
import {connect} from 'react-redux';
import { addPerson } from '../../widgets/people';
import { moduleName as moduleAuthName } from '../../widgets/auth';

class AdminPage extends Component{
	static propTypes = {
		match: PropTypes.object,
		user: PropTypes.object
	}

	render(){
		const {match, user} = this.props;
		let email_span = (user) ? <span className="float-right">{user.email}</span> : null;
		return(
			<section>
				{email_span}
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

function sateToProps(state, props){
	return {
		user: state[moduleAuthName].user
	}
}

export default connect(sateToProps, {addPerson})(AdminPage);