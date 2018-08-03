import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eventsSelector, loadingSelector, loadedSelector, getEvents, selectEvent } from '../../widgets/events';
import Loading from '../common/Loading';

export class EventsTable extends Component{
	static propTypes = {
		events: PropTypes.any.isRequired,
		loading: PropTypes.bool,
		loaded: PropTypes.bool,
		getEvents: PropTypes.func.isRequired
	}

	componentDidMount(){
		this.props.getEvents();
	}

	render(){
		const {loading} = this.props;
		if(loading){ return <Loading />; }

		return (
			<table>
				<thead>
					<tr>
						<th>title</th>
						<th>When</th>
						<th>Where</th>
					</tr>
				</thead>
				<tbody>
					{this.getRows()}
				</tbody>
			</table>
		);
	}

	getRows = () =>{
		const {events} = this.props;
		return events.map((event, index) =>{
			return (
				<tr key={event.uid} className="test--events__item" onClick = {this.rowSelect(index)}>
					<td>{event.title}</td>
			     	<td>{event.when}</td>
			     	<td>{event.where}</td>
				</tr>
			);
		});
	}

	rowSelect = index => () =>{
		const {selectEvent} = this.props;
		selectEvent(index);
	}
}

function mapToProps(state){
	return {
		events: eventsSelector(state),
		loading: loadingSelector(state),
		loaded: loadedSelector(state),
	};
}

export default connect(mapToProps, {getEvents, selectEvent})(EventsTable);
