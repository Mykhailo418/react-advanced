import React, {Component,  Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, NavLink, Switch} from 'react-router-dom';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import {signIn, signUp} from '../../widgets/auth';

class AuthPage extends Component{
	static propTypes = {
		match: PropTypes.object
	}

	render(){
		//console.log(this.props);
		const {match} = this.props;
		return(
			<section>
				<h1>Auth Page</h1>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
				    <ul className="navbar-nav">
					    <Fragment>
					        <li className="nav-item">
						       	<NavLink to={`${match.path}/signin`} activeClassName="active" className="nav-link">
									Sign In
								</NavLink>
					       	</li>
					       	<li className="nav-item">
						       	<NavLink to={`${match.path}/signup`} activeClassName="active" className="nav-link">
									Sign Up
								</NavLink>
					       	</li>
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
}

export default connect(
  null,
  { signIn, signUp }
)(AuthPage);