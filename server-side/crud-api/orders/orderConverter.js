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
			name : orderDao.name,
		 	description : orderDao.description,
		 	category : orderDao.category,
			price : orderDao.price,
			currency : orderDao.currency
		};
	 	if(orderDao.type) {
		 	toReturn.type = orderDao.type;
	 	}
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
		orderDao.product = req.body.product;
		orderDao.seat = req.body.seat;
}

module.exports = OrderConverter;