var Product = require('./productDao');

var ProductConverter = {

	jsonToDao : function(req){
		var productDao = new Product();
		initFields.call(this, productDao, req);
		return productDao;
	},
	
	daoToJson : function(productDao){
		var toReturn = {
			_id : productDao._id,
			name : productDao.name,
		 	description : productDao.description,
		 	catgorie : productDao.catgorie,
			price : productDao.price,
			currency : productDao.currency
		};
	 	if(productDao.type) {
		 	toReturn.type = productDao.type;
	 	}
		return toReturn; 
	},
	daoListToJson : function(productListDao) {
		var productsForm = { products: [] };
		for (var product of productListDao) {
			productsForm.products.push(this.daoToJson(product));	
		}
		return productsForm;
	},
	
	mergeJsonIntoDao : function(productDao, req) {
		initFields.call(this, productDao, req);
	},
};

function initFields(productDao, req) {
    	productDao.name = req.body.name;
		productDao.description = req.body.description;
		productDao.catgorie = req.body.catgorie;
		if(req.body.type) {
			productDao.type = req.body.type;
		}
		productDao.price = req.body.price;
		productDao.currency = req.body.currency;
}

module.exports = ProductConverter;