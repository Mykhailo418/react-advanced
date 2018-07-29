import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eventsSelector, loadingSelector, loadedSelector, getEvents } from '../../widgets/events';
import Loading from '../common/Loading';

class EventsTable extends Component{
	static propTypes = {
		events: PropTypes.array.isRequired,
		loading. PropTypes.bool,
		loaded. PropTypes.bool,
	}

	componentDidMount(){
		this.props.getEvents();
	}

	render(){
		const {loading} = this.props;
		if(loading){ return <Loading />; }

		return (
			<table>
				<tbody>
					{this.getRows()}
				</tbody>
			</table>
		);

		getRows = () =>{
			const {events} = this.props;
			return events.map((event) =>{
				return (
					<tr key={event.uid}>
						<td>{event.title}</td>
				     	<td>{event.when}</td>
				     	<td>{event.where}</td>
					</tr>
				);
			});
		}
	}
}

function mapToProps(state){
	return {
		events: eventsSelector(state),
		loading: loadingSelector(state),
		loaded: loadedSelector(loaded),
	};
}

export default connect(mapToProps, {getEvents})(EventsTable);
