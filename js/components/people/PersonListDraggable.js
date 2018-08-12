import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { peopleListSelector, loadingSelector, getPeople } from '../../widgets/people';
import Loading from '../common/Loading';
import { List } from 'react-virtualized';
import PersonCardDraggable from './PersonCardDraggable';

export class PeopleListDraggable extends Component{
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
			    width={300}
			    height={1000}
			    rowCount={people.length}
			    rowHeight={100}
			    rowRenderer={this.rowRenderer}
			/>
		);
	}

	rowRenderer = ({key, index, isScrolling, isVisible, style }) => {
		const {people} = this.props;
		return (
			<PersonCardDraggable key={key} person={people[index]} style={style} className="test--people__item" />
		);
	}
}

function mapToProps(state){
	return {
		people: peopleListSelector(state),
		loading: loadingSelector(state)
	}
}

export default connect(mapToProps, {getPeople})(PeopleListDraggable);
