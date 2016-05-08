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
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/list')
	.get(function(req, res) {
        res.json({ message: 'List of seats.'});
	});

// more routes for our API will happen here
module.exports = router;