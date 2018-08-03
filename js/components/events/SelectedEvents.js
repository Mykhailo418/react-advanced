import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectedEventsSelector } from '../../widgets/events';

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
		console.log(selectedEvents, selectedEvents.length);
		if(!selectedEvents.size) return <li>There are no selected events</li>
		return selectedEvents.map((event) => {
			return <li key={event.uid}>{event.title}</li>
		})
	}
}

function mapToProps(state){
	return {
		selectedEvents: selectedEventsSelector(state)
	}
}

export default connect(mapToProps)(SelectedEvents);