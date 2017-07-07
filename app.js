/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Deployment tracking
require('cf-deployment-tracker-client').track();

// setupError will be set to an error message if we cannot recover from service setup or init error.
let setupError = '';

const queryBuilder = require('./query-builder');
const WatsonDiscoverySetup = require('./lib/watson-discovery-setup');
const DEFAULT_NAME = 'data-breaches';

const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const discovery = new DiscoveryV1({
  // uname/pwd will be pulled in from VCAP_SERVICES or .env
  version_date: '2016-11-09',
  qs: { aggregation: `[${queryBuilder.aggregations.join(',')}]` },
});

// Pull in all json files to add to discovery collection
var discoveryDocs = [];
const fs = require('fs');
const path = require('path');
var arrayOfFiles = fs.readdirSync('./data/breaches/');
arrayOfFiles.forEach(function(file) {
  discoveryDocs.push(path.join('./data/breaches/', file));
});

// let discoveryParams; // discoveryParams will be set after Discovery is validated and setup.
const discoverySetup = new WatsonDiscoverySetup(discovery);
const discoverySetupParams = { default_name: DEFAULT_NAME, documents: discoveryDocs };
discoverySetup.setupDiscovery(discoverySetupParams, (err, data) => {
  if (err) {
    handleSetupError(err);
  } else {
    console.log('Discovery is ready!' + data);
    // discoveryParams = data;
  }
});

// gather news collection info
const NewsDemoApp = new Promise((resolve) => {
  const environment_id = process.env.ENVIRONMENT_ID;
  const collection_id = process.env.COLLECTION_ID;

  // Bootstrap application settings
  const express = require('express');
  const app = express();
  require('./config/express')(app);

  app.get('/', (req, res) => {
    res.render('index', {
      BLUEMIX_ANALYTICS: process.env.BLUEMIX_ANALYTICS,
    });
  });
  // setup query endpoint for news
  app.post('/api/query', (req, res, next) => {
    const params = Object.assign({}, queryBuilder.build(req.body, true), {
      environment_id: environment_id,
      collection_id: collection_id
    });

    discovery.query(params, (error, response) => {
      if (error) {
        next(error);
      } else {
        res.json(response);
      }
    });
  });

  // error-handler settings for all other routes
  require('./config/error-handler')(app);
  resolve(app);
});

/**
 * Handle setup errors by logging and appending to the global error text.
 * @param {String} reason - The error message for the setup error.
 */
function handleSetupError(reason) {
  setupError += ' ' + reason;
  console.error('The app failed to initialize properly. Setup and restart needed.' + setupError);
  // We could allow our chatbot to run. It would just report the above error.
  // Or we can add the following 2 lines to abort on a setup error allowing Bluemix to restart it.
  console.error('\nAborting due to setup error!');
  process.exit(1);
}

module.exports = NewsDemoApp;
