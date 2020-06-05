const generateBase64Token = (clientId, clientSecret) => {
	const encodedData = Buffer.from(clientId + ':' + clientSecret).toString('base64');
	const token = 'Basic ' + encodedData;
	return token;
};

const getFormatedDate = () => new Date().toISOString().replace(/T/, '-').replace(/\..+/, '');

module.exports = {
	generateBase64Token,
	getFormatedDate
};
