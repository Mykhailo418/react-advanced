import React from 'react';
import 'jest-enzyme';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EventsTable } from '../../components/events/EventsTable';
import mockedEvents from '../../../mocks/conferences';
import Loading from '../../components/common/Loading';

const events = mockedEvents.map((event, index) => ({
  ...event,
  uid: index.toString()
}));
const testItemClassName = 'test--events__item';

Enzyme.configure({ adapter: new Adapter() });

describe('EventsTable', () => {
	it('should render a loader', () => {
		 const container = shallow(<EventsTable events={{}} loading getEvents={() => {}} />);
		 expect(container.contains(<Loading />)).toBe(true);
	});
	it('check render events', () => {
		const container = shallow(<EventsTable events={events} getEvents={() => {}} />);

		expect(container.find('.'+testItemClassName).length).toEqual(events.length);
	});

	it('should fetch all events', (done) => {
	    shallow(<EventsTable getEvents={done} events={[]} />)
	  })
});