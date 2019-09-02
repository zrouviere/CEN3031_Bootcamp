var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

function printJSON(input, response) {

  //response.write(JSON.stringify(input));
  input.entries.forEach(function (item) {
    response.write("Code: " + item.code + "\n");
    response.write("Name: " + item.name + "\n");

    if (item.coordinates) {
      response.write("Coordinates:\n");
      response.write("Latitude: " + item.coordinates.latitude + "\n");
      response.write("Longitude: " + item.coordinates.longitude + "\n");
    }

    //console.log(item.address)
    if (item.address)
      response.write("Address: " + item.address + "\n");
    response.write("\n");

  })

};

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format as a response if a GET request
    is sent to the '/listings' path. Otherwise, it should send a 404 error.

    HINT: Explore the request object and its properties
    HINT: Explore the response object and its properties
    https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation

    HINT: Explore how callback's work
    http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4

    HINT: Explore the list of MIME Types
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
   */
  if (request.url == "/listings" && request.method == "GET") {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(listingData));
    //TODO: ^^ super ugly but this passes the test, comment out this above line and uncomment the below line to make it pretty
    //printJSON(listingData, response);
  } else {
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("Bad gateway error");
  }
  response.end();


};





fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 

    HINT: Check out this resource on fs.readFile
    //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

    HINT: Read up on JSON parsing Node.js
   */
  var rawJSON = fs.readFileSync("listings.json");
  listingData = JSON.parse(rawJSON);

    //Check for errors
  

   //Save the sate in the listingData variable already defined
  

  //Creates the server
  
  //Start the server
  server = http.createServer(requestHandler);
  server.listen(port, function () {
    //once the server is listening, this callback function is executed
    console.log('Server listening on: http://localhost:' + port);
  });


});
