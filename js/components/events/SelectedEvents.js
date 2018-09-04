import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectedEventsSelector } from '../../widgets/events';
import EventCard from './EventCard';
import { TransitionMotion, spring } from 'react-motion';

const motionSettings = { stiffness: 50, damping: 30 };

class SelectedEvents extends Component{
	static proptypes = {
		selectedEvents: PropTypes.any.isRequired,
	}

	render(){
		if(!this.props.selectedEvents){ return null; }
		return(
			<TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
			 {(interpolated) => (
					<ul>
						{this.outputEventsList(interpolated)}
					</ul>
				)}
			</TransitionMotion>
		);
	}

	outputEventsList = (interpolated) => {
		if(!interpolated || !interpolated.length) return <li>There are no selected events</li>
		//console.log('interpolated = ',interpolated);
		return interpolated.map((data, index) => {
			return (
				<div key={data.key} style={{...data.style }}>
					<EventCard event={data.data} />
				</div>
			);
		});
	}

	willEnter = () => ({
    opacity: 0
  })

	willLeave = () => ({
    opacity: spring(0, motionSettings)
  })

	getStyles(){
		let arr = this.props.selectedEvents.valueSeq().toArray();
    return arr.map((event) => ({
      key: event.uid,
      style: {
        opacity: spring(1, motionSettings)
      },
      data: event
    }))
  }
}

function mapToProps(state){
	return {
		selectedEvents: selectedEventsSelector(state),
	}
}

export default connect(mapToProps)(SelectedEvents);
