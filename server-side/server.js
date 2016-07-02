// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose    = require('mongoose'); 
var crudApi = require('app_modules/crud-api');
var http = require('http');
var server = http.createServer(app);
mongoose.connect('mongodb://localhost:27017/onBoardRealTimeSeatMap');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

app.use(express.static('front'));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(require('./routes'));
app.use('/seats/', crudApi.seats.routes);
app.use('/categories/', crudApi.categories.routes);
app.use('/products/', crudApi.products.routes);
app.use('/orders/', crudApi.orders.routes);
app.use('/pnrs/', crudApi.pnrs.routes);
app.use('/passengers/', crudApi.passengers.routes);

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
// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
