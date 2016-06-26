var Tokenizer = {
    tokenize : function (passenger, callback) {

        if(passenger.seat._id) {
            passenger.seat = passenger.seat._id;
        }
        if(passenger.pnr._id) {
            passenger.pnr = passenger.pnr._id;
        }
        callback(null, new Buffer(JSON.stringify(passenger)).toString('base64'));
    },
    detokenize : function (token, callback) {
        callback(null, JSON.parse(new Buffer(token, 'base64').toString('ascii')));
    }
};

module.exports = Tokenizer;