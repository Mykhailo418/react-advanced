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
			return new DataRecord(data);
		})
	);
};