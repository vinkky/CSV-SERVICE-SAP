const fetch = require('node-fetch');
const FormData = require('form-data');
const { sapApi, radiusTokenApi, radiusUploadApi, clientId, clientSecret, username, password } = require('./config');
const { generateBase64Token } = require('./utils');

const getStores = async (baseSiteId) => {
	const params = new URLSearchParams({ pageSize: 100000, fields: 'FULL' });
	try {
		const response = await fetch(`${sapApi}/${baseSiteId}/stores?${params}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		const { stores } = await response.json();
		if(!stores) throw new Error(`No stores for provided BaseSite: ${baseSiteId}`)
		return stores;
	} catch (err) {
		throw new Error(err.message);
	}
};

const getToken = async () => {
	try {
		const response = await fetch(radiusTokenApi, {
			method: 'POST',
			body: `grant_type=password&username=${username}&password=${password}`,
			headers: {
				Authorization: generateBase64Token(clientId, clientSecret),
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
		const { access_token } = await response.json();
		return access_token;
	} catch (err) {
		throw new Error('Failed to get access token');
	}
};

const uploadData = async (data, token) => {
	try {
		const fileName = `stores-${Date.now()}.csv`;
		const form = new FormData();
		form.append('import_files', data, fileName);
		await fetch(radiusUploadApi, {
			method: 'POST',
			body: form,
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': `multipart/form-data; boundary=${form._boundary}`
			}
		});
	} catch (err) {
		throw new Error('Failed to upload stores data');
	}
};

module.exports = {
	getStores,
	getToken,
	uploadData
};
