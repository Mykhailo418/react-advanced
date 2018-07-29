import { List } from 'immutable';

export function generateId() {
	return Date.now();
};

export function convertsEventsDataResponse(obj, DataRecord){
	return new List(
		Object.entries(obj).map(([id, data]) => {
			return new DataRecord({
				uid: id,
				...data
			});
		})
	);
};