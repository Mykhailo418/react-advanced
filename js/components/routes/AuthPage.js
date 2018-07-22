import React, {Component,  Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, NavLink, Switch, Link} from 'react-router-dom';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import {signIn, signUp, signOut, moduleName} from '../../widgets/auth';

class AuthPage extends Component{
	static propTypes = {
		match: PropTypes.object,
		user: PropTypes.object
	}

	render(){
		//console.log(this.props);
		const {match, user} = this.props;
		let email_span = (user) ? <span className="float-right">{user.email}</span> : null;
		let signInOut = (user) ? <a href="#" className="nav-link" onClick={this.signOutClick}>
									Sign Out
								</a> : 
								<NavLink to={`${match.path}/signin`} activeClassName="active" className="nav-link">
									Sign In
								</NavLink>
								;
		let admin_page = (user) ? <li><Link to="/admin" className="nav-link">
									Admin Page
								</Link></li> : null;
		return(
			<section>
				{email_span}
				<h1>Auth Page</h1>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
				    <ul className="navbar-nav">
					    <Fragment>
					       	<li className="nav-item">
						       	<NavLink to={`${match.path}/signup`} activeClassName="active" className="nav-link">
									Sign Up
								</NavLink>
					       	</li>
					       	 <li className="nav-item">
						      {signInOut}
					       	</li>
					       	{admin_page}
					    </Fragment>
				    </ul>
				</nav>
				<Switch>
					<Route path={`${match.path}/signin`} render={this.gerSignInCompoent} />
					<Route path={`${match.path}/signup`} render={this.gerSignUpCompoent} />
				</Switch>
			</section>
		);
	}

	gerSignInCompoent = () =>{
		return <SignInForm onSubmit={this.handleSubmitSignIn} />
	}

	gerSignUpCompoent = () =>{
		return <SignUpForm onSubmit={this.handleSubmitSignUp} />
	}

	handleSubmitSignIn = ({ email, password }) => {
		console.log('---', email, password);
		this.props.signIn({ email, password });
		return false;
	}

	handleSubmitSignUp = ({ email, password }) => {
		console.log('---', email, password);
		this.props.signUp({ email, password });
		return false;
	}

	signOutClick = (e) => {
		e.preventDefault();
		this.props.signOut();
	}
}

function sateToProps(state, props){
	return {
		user: state[moduleName].user
	}
}

export default connect(
  sateToProps,
  { signIn, signUp, signOut }
)(AuthPage);