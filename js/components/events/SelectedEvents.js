import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectedEventsSelector } from '../../widgets/events';
import EventCard from './EventCard';

class SelectedEvents extends Component{
	static proptypes = {
		selectedEvents: PropTypes.any.isRequired,
	}

	render(){
		return(
			<ul>
				{this.outputEventsList()}
			</ul>
		);
	}

	outputEventsList = () => {
		const {selectedEvents} = this.props;
		//console.log(selectedEvents, selectedEvents.length);
		if(!selectedEvents.size) return <li>There are no selected events</li>
		//console.log(selectedEvents.toJS());
		return selectedEvents.valueSeq().toArray().map((event) => {
			return <EventCard key={event.uid} event={event} />;
		});
	}
}

function mapToProps(state){
	return {
		selectedEvents: selectedEventsSelector(state),
	}
}

export default connect(mapToProps)(SelectedEvents);
