var validate = function(req) {
	console.log("from validate");
	toReturn = {valid: true, errorMessage: ""};
	var body = req.body;
	var pos = req.body.position;
	if(pos === null && pos === undefined) {
		toReturn.valid = false;
		toReturn.errorMessage = "Position undefined or null";
	}

	validateField.call(this, pos.row, "Row", new RegExp('^[0-9]{1,2}$'), toReturn);
	validateField.call(this, pos.column, "Column", new RegExp('^[A-Z]{1}$'), toReturn);
	validateField.call(this, body.status, "Status", new RegExp('^(true|false)$'), toReturn);
	console.log("validate: " + toReturn.valid + " " + toReturn.errorMessage);
	return toReturn;
}


function validateField(str, varName, regExp, toReturn) {
	console.log("from validateField >> str: " + str + " varName: " + varName + " regExp: " + regExp + " toReturn: " + toReturn);
	if(toReturn.valid) {
		if(str === null && str === undefined) {
			toReturn.valid = false;
			toReturn.errorMessage = varName + " undefined or null";
		}
	}

	if(regExp) {
		validateString.call(this, str, varName, regExp, toReturn);
	}

	console.log("from validateField: " + toReturn.valid + " " + toReturn.errorMessage);
}

function validateString(str, varName, regExp, toReturn) {
		if(toReturn.valid) {
			if(!str.match(regExp)) {
				toReturn.valid = false;
				toReturn.errorMessage = varName + " doesn't match " + regExp;
			}
		}
	return toReturn;
}

module.exports = validate;