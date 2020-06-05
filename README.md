# Upload CSV service

## Application flow
* Call SAP API and retrieve stores based on ```baseSiteId```
* Transform data that came from SAP API to CSV format
* Call Radius8 API to retrieve authentication token
* Upload CSV to Radius8 server by calling it's API and providing CSV file with authentication token

## Installation
In order to run program you need to install:

[Node.js](https://nodejs.org/en/download/) and the package manager [npm](https://www.npmjs.com/get-npm)

In project directory open terminal and type:

```bash
npm install
npm run start
```
That's it!


## Usage

Application has scheduler, which automatically calls SAP API and uploads it's content everyday at midnight

It's also possible to do it manually by calling: ```localhost:8080/stores/{baseSiteId}``` example: ```localhost:8080/stores/apparel-uk```

You can also call ```localhost:8080/stores``` then ```baseSiteId``` will be defaulted to ```"powertools"``` or different value check "Setting up own BaseSite" section


### Notes
Stores which will be populdated to CSV are based on ```baseSiteId``` field, you can change what stores you want to retrieve by changing it. 

To get all available baseSites use this API: ```https://gdm-sap-io-1.usdemo.hybris.com/rest/v2/basesites```

Data to Radius8 server will be uploaded everyday at midnight

### Setting up own BaseSite

Open ```.env``` file search for ```BASE_SITE_ID``` variable and change it's value 
(by default it's set to ```powertools```)
