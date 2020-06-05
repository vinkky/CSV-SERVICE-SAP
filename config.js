const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    clientId: process.env.API_KEY,
    clientSecret: process.env.API_SECRET,
    baseSiteId:   process.env.BASE_SITE_ID,
    sapApi: 'https://gdm-sap-io-1.usdemo.hybris.com/rest/v2',
	radiusTokenApi: 'https://platform.radius8.com/api/v1/auth/token',
	radiusUploadApi: 'https://platform.radius8.com/api/v1/data/import?action=UPDATE'
};
 