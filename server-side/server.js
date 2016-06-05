// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose    = require('mongoose'); 
var crudApi = require('app_modules/crud-api');

mongoose.connect('mongodb://localhost:27017/onBoardRealTimeSeatMap');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(require('./routes'));
app.use('/seats/', crudApi.seats.routes);
app.use('/categories/', crudApi.categories.routes);
app.use('/items/', crudApi.items.routes);
app.use('/pnrs/', crudApi.pnrs.routes);

app.use('/passenger/', require('./rest-api/passenger').routes);
app.use('/pnc/', require('./rest-api/pnc').routes);

// START THE SERVER INITIALIZATION
// =============================================================================
var ServerInitializer = require('./server-init/serverInitializer');
ServerInitializer.init(function(err, result) {
    if(!err) {
        console.log(result);
        ServerInitializer.initSeatPassengerCouple(function(err, result) {
           if(!err) {
                console.log(result);
           } else {
               console.log(err);
           }
        });
    } else {
        console.log(err);
    }
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
