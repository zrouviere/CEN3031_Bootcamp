'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */

//var listingData;
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
mongoose.connect(config.db.uri);
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach


  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
var listingData;

var rawJSON = fs.readFileSync("listings.json");
listingData = JSON.parse(rawJSON);
//console.log(listingData);

listingData.entries.forEach(function (item) {
    var temp = Listing(item);
    temp.save(function (err) {
        if (err) return console.error(err);
    });

});
//pause
setTimeout(function () {
    mongoose.disconnect()
}, 1000);




/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */