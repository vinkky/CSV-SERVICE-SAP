const { parse } = require('json2csv');
const { get, map, filter } = require('lodash');

const fields = [
	{ label: 'store_code', value: 'address.id', default: '' },
	{ label: 'name', value: 'name', default: '' },
	{ label: 'address1', value: 'address.formattedAddress', default: '' },
	{ label: 'city', value: 'address.town', default: '' },
	{ label: 'state', value: 'address.region.name', default: '' },
	{ label: 'zip', value: 'address.postalCode', default: '' },
	{ label: 'country', value: 'address.country.isocode', default: '' },
	{ label: 'phone', value: 'address.phone', default: '' },
	{ label: 'lat', value: 'geoPoint.latitude', default: '' },
	{ label: 'lng', value: 'geoPoint.longitude', default: '' },
	{ label: 'hours', value: (row) => transformWorkDays(row.openingHours), default: '' }
];

const transformWorkDays = ({ weekDayOpeningList = [] }) => {
	const workingDays = filter(weekDayOpeningList, ({ closed }) => closed === false);
	return map(workingDays, ({ weekDay, openingTime, closingTime }) => {
		return `{${weekDay}:${get(openingTime, 'formattedHour')}-${get(closingTime, 'formattedHour')}}`;
	}).join('');
};

const parseToCsv = (data) => {
	try {
		const csv = parse(data, { fields });
		return csv;
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	parseToCsv
};
