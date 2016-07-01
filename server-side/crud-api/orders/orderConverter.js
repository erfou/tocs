var Order = require('./orderDao');

var OrderConverter = {

	jsonToDao : function(req){
		var orderDao = new Order();
		initFields.call(this, orderDao, req);
		return orderDao;
	},
	
	daoToJson : function(orderDao){
		var toReturn = {
			_id : orderDao._id,
			passenger : orderDao.passenger,
		 	product : orderDao.product,
		 	quantity : orderDao.quantity,
		};
		return toReturn; 
	},
	daoListToJson : function(orderListDao) {
		var ordersForm = { orders: [] };
		for (var order of orderListDao) {
			ordersForm.orders.push(this.daoToJson(order));	
		}
		return ordersForm;
	},
	
	mergeJsonIntoDao : function(orderDao, req) {
		initFields.call(this, orderDao, req);
	},
};

function initFields(orderDao, req) {
    	orderDao.passenger = req.body.passenger;
		orderDao.quantity = req.body.quantity;
		orderDao.fromPNR = false;
		if(req.body.fromPNR) {
			orderDao.fromPNR = req.body.fromPNR;
		}
		orderDao.product = req.body.product;
}

module.exports = OrderConverter;