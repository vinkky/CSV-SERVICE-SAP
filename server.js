const express = require('express');
const app = express();
const schedule = require('node-schedule');
const { parseToCsv } = require('./utils');
const { getStores, getToken, uploadData } = require('./controllers');
const { baseSiteId } = require('./config.js');
require('dotenv').config();

app.get('/stores/:baseSiteId?', async function(req, res) {
	try {
		const baseSite = req.params.baseSiteId || baseSiteId;
		const stores = await getStores(baseSite);
		const storesCSV = parseToCsv(stores);
		const accessToken = await getToken();
		uploadData(storesCSV, accessToken);
		return res.status(200).send('Success');
	} catch (err) {
		console.error(err);
		return res.status(500).send(err.message);
	}
});

schedule.scheduleJob('*/30 * * * * *', async () => {
	try {
		const stores = await getStores(baseSiteId);
		const storesCSV = parseToCsv(stores);
		const accessToken = await getToken();
		uploadData(storesCSV, accessToken);
	} catch (err) {
		console.error(err);
	}
}); // run everyday at midnight


const port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log(`server running on ${port} current BaseSite - ${baseSiteId}`);
});
