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
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const DEFAULT_COLLECTION_NAME = 'data-breaches';

var environment_id = process.env.ENVIRONMENT_ID;
var collection_id = process.env.COLLECTION_ID;

const discovery = new DiscoveryV1({
  // uname/pwd will be pulled in from VCAP_SERVICES or .env
  version_date: '2017-04-27',
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

// setup Discovery by finding/creating environment and finding/creating collection
var discoverySetupParams = { default_name: DEFAULT_COLLECTION_NAME };
const discoverySetup = new WatsonDiscoverySetup(discovery);
discoverySetup.setupDiscovery(discoverySetupParams, (err, data) => {
  if (err) {
    handleSetupError(err);
  } else {
    console.log('Discovery is ready!');

    // now load data into discovery service collection
    var collectionParams = data;

    // set collection creds
    environment_id = collectionParams.environment_id;
    collection_id = collectionParams.collection_id;
    
    collectionParams.numDocs = discoveryDocs.length;
    collectionParams.docChunkSize = 5;  // number of docs to process at one time
    collectionParams.documents = discoveryDocs.slice(0, collectionParams.docChunkSize);
    collectionParams.docCurrentIdx = 0;
    collectionParams.checkedForExistingDocs = false;
    collectionParams.docsAlreadyLoaded = false;
    console.log('Begin loading ' + collectionParams.numDocs + ' json files into discovery. Please be patient as this can take several minutes.');
    console.log('Processing docs[' + collectionParams.docCurrentIdx + ':' + (collectionParams.docCurrentIdx + collectionParams.docChunkSize) + ']');
    loadCollectionFiles(collectionParams);
  }
});

// load json files into discovery collection
function loadCollectionFiles(params) {
  discoverySetup.loadDiscoveryData(params, (err, data) => {
    if (err) {
      handleSetupError(err);
      console.log(err);
    } else {
      var collectionParams = data;
      collectionParams.docCurrentIdx += collectionParams.docChunkSize;
      if ((! collectionParams.docsAlreadyLoaded) && (collectionParams.docCurrentIdx < collectionParams.numDocs)) {
        var endIdx = Math.min(collectionParams.docCurrentIdx + collectionParams.docChunkSize, collectionParams.numDocs);
        console.log('Next load of docs = [' + collectionParams.docCurrentIdx + ':' + endIdx + ']');
        collectionParams.documents = discoveryDocs.slice(collectionParams.docCurrentIdx, endIdx);
        loadCollectionFiles(collectionParams);
      } else {
        console.log('Discovery collection loading has completed!');
      }
    }
  });
}

// gather news collection info
const NewsDemoApp = new Promise((resolve) => {
  // const environment_id = process.env.ENVIRONMENT_ID;
  // const collection_id = process.env.COLLECTION_ID;

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
