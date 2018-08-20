import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eventsListSelector, loadingSelector, loadedSelector, getEvents, selectEvent } from '../../widgets/events';
import Loading from '../common/Loading';
import { Table, Column, InfiniteLoader } from 'react-virtualized';
import TableRow from './TableRow';
import 'react-virtualized/styles.css';

class VirtualizedEventsTable extends Component{
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
		const {loading, events, loaded} = this.props;
		return (
			<InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={loaded ? events.length : events.length + 1}
            >
            	{ ({onRowsRendered, registerChild}) => (
					<Table
						ref={registerChild}
				        rowCount={events.length}
				        width={500}
				        height={300}
				        rowHeight={40}
				        rowGetter={this.rowGetter}
				        headerHeight={50}
				        onRowClick={this.rowSelect}
				        headerHeight={50}
				        overscanRowCount={5}
				        onRowsRendered={onRowsRendered}
								rowRenderer={this.rowRenderer}
				      >
				        <Column dataKey="title" width={200} label="name" />
				        <Column dataKey="where" width={300} label="place" />
				        <Column dataKey="when" width={300} label="when" />
				    </Table>
				    )
				}
			</InfiniteLoader>
		);
	}

	isRowLoaded = ({ index }) => {
		//console.log('-- isRowLoaded =', index < this.props.events.length, index, this.props.events.length );
		return index < this.props.events.length;
	}

	loadMoreRows = () => {
        //console.log('--- loadMoreRows = ', 'load more')
        this.props.getEvents();
    }

	rowGetter = ({ index }) => {
		return this.props.events[index];
	}

	rowSelect = ({ rowData }) =>{
		//console.log(event);
		return this.props.selectEvent(rowData.uid);
	}

	rowRenderer = (props) => {
		const {key, ...rest} = props;
		return <TableRow key={key} {...rest} />
	}
}

function mapToProps(state){
	return {
		events: eventsListSelector(state),
		loading: loadingSelector(state),
		loaded: loadedSelector(state),
	};
}

export default connect(mapToProps, {getEvents, selectEvent})(VirtualizedEventsTable);
