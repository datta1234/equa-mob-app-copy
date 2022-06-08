/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

var fs = require('fs');

var jsf = require('json-schema-faker');

var mockDataSchema = require('./mocks/dataSchema');

var json = JSON.stringify(jsf(mockDataSchema));

fs.writeFile('./mocks/api/db.json', json, (err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Mock data generated.');
  }
});
