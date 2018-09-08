import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { peopleListSelector, loadingSelector, getPeople } from '../../widgets/people';
import Loading from '../common/Loading';
import { List } from 'react-virtualized';
import PersonCard from './PersonCard';
import { TransitionMotion, spring } from 'react-motion';

const motionSettings = { stiffness: 50, damping: 50 };

const personStyle = {
	display: 'inline-block',
	width: 'auto',
	margin: '0 20px 10px 0',
	position: 'static'
}

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
		if(!people || !people.length) return null
		return (
			<TransitionMotion
        styles={this.getStyles}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
				{(interpolated) => (
					<List
					    width={1000}
					    height={1000}
					    rowCount={interpolated.length}
					    rowHeight={100}
					    rowRenderer={this.rowRenderer(interpolated)}
					/>
				)}
			</TransitionMotion>
		);
	}

	rowRenderer = (interpolated) => ({key, index, isScrolling, isVisible, style }) => {
		const {people} = this.props;
		const rowCtx = interpolated[index];
		return (
			<div key={rowCtx.key} style={{ ...style, ...personStyle, ...rowCtx.style }}>
				<PersonCard person={rowCtx.data} className="test--people__item" />
			</div>
		);
	}

	get getStyles(){
    let arr = this.props.people.map((person) => ({
      key: person.uid,
      style: {
        opacity: spring(1, motionSettings)
      },
      data: person
    }));
		return arr;
  }

	willEnter = () => ({
    opacity: 0
  })

	willLeave = () => ({
    opacity: spring(0, motionSettings)
  })
}

function mapToProps(state){
	return {
		people: peopleListSelector(state),
		loading: loadingSelector(state)
	}
}

export default connect(mapToProps, {getPeople})(PeopleList);
