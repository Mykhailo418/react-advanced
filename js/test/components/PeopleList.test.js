import React from 'react';
import 'jest-enzyme';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PeopleList } from '../../components/people/PeopleList';
import Loading from '../../components/common/Loading';
import { List } from 'react-virtualized';

function generateList(length) {
    const arr = []
    for (let i = 0; i < length; i++) {
        arr.push({
        	id: Date.now(),
            firstName: Math.random().toString(),
            lastName: Math.random().toString(),
            email: Math.random().toString()
        })
    }
     return arr
}

Enzyme.configure({ adapter: new Adapter() });

const testItemClassName = 'test--people__item';

describe('PeopleList', () => {
	it('should render a loader', () => {
		const container = shallow(<PeopleList people={{}} loading getPeople={() => {}} />);
		expect(container.contains(<Loading />)).toBe(true);
	});

	it('check render people', () => {
		const listPeople = generateList(5);
		const container = mount(<PeopleList people={listPeople} getPeople={() => {}} />);
		expect(container.find('.'+testItemClassName).length).toEqual(listPeople.length);
	
	});

	it('should fetch all people', (done) => {
	    shallow(<PeopleList getPeople={done} people={[]} />)
	  })

});