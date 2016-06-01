var express = require('express');
var router = express.Router();

router.route('/service')
	.get(function(req, res) {
		res.json({
		    seat_map:[{
		        seatView: {
		            seat: {
                        id: "6A",
    		            fareClass: "PRE",
    		            occuped: true,
    		            link: {
    		                rel: "Détails du siège",
    		                href: "/pnc/seat/6A"
    		            }		                
		            },
    		        passenger: {
    		            full_name: "sixa premiere"
    		        }
		            
		        },
		        links: [{
		             
		        }]
		    }]
		});
  	});

module.exports = router;
