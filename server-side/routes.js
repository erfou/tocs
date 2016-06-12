// ROUTES FOR OUR API
// =============================================================================
var express = require('express');

var router = express.Router();

router.use(function(req, res, next){
	console.log('Something is happening.');
	next();
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/users-api)
router.get('/', function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!' });
    res.sendFile('./front/index.html', {root: __dirname});   
});

router.get('/status', function(req, res){
	res.send('OK');
});

// more routes for our API will happen here
module.exports = router;