import { List, OrderedMap } from 'immutable';

export function generateId() {
	return Date.now();
};

export function convertsEventsDataResponse(values, DataRecord) {
  return Object.entries(values).reduce(
    (acc, [uid, value]) => acc.set(uid, new DataRecord({ uid, ...value })),
    new OrderedMap({})
  )
};

export function convertsDataResponse(obj, DataRecord){
	return new List(
		Object.entries(obj).map(([id, data]) => {
			const {events, ...rest} = data;
			return new DataRecord({uid: id, events: List(events),...rest});
		})
	);
};

export function convertsPeopleToRequest(people, DataRecord){
	let result = {};
	let peopleJs = people.toJS();
	peopleJs.forEach((person,i) => {
			const {uid, ...rest} = person;
			result[person.uid] = rest;
	});
	return result;
};
