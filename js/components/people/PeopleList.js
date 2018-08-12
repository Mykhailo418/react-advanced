import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { peopleListSelector, loadingSelector, getPeople } from '../../widgets/people';
import Loading from '../common/Loading';
import { List } from 'react-virtualized';

export class PeopleList extends Component{
	static proptypes = {
		people:  PropTypes.any.isRequired,
		loading: PropTypes.boolean,
		getPeople: PropTypes.func
	}

	componentDidMount(){
		this.props.getPeople();
	}

	render(){
		const {loading, people} = this.props;
		if(loading) return <Loading />;
		return (
			<List
			    width={1000}
			    height={1000}
			    rowCount={people.length}
			    rowHeight={40}
			    rowRenderer={this.rowRenderer}
			/>
		);
	}

	rowRenderer = ({key, index, isScrolling, isVisible, style }) => {
		const {people} = this.props;
		return (
			<Fragment  key={key}>
				<div
				  key={key}
				  style={style}
				  className="test--people__item"
				>
				  <span>{people[index].id}</span> 
				&#160;-  <span>{people[index].fname}</span> 
				&#160;-  <span>{people[index].lname}</span> 
				&#160;-  <span>{people[index].email}</span> 
				</div>
			</Fragment>
		);
	}
}

function mapToProps(state){
	return {
		people: peopleListSelector(state),
		loading: loadingSelector(state)
	}
}

export default connect(mapToProps, {getPeople})(PeopleList);