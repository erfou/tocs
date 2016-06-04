var Tokenizer = {
    tokenize : function (seat, callback) {
        console.log(JSON.stringify(seat));
        callback(null, new Buffer(JSON.stringify(seat)).toString('base64'));
    },
    detokenize : function (token, callback) {
        callback(null, JSON.parse(new Buffer(token, 'base64').toString('ascii')));
        //console.log(new Buffer("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
    }
};

module.exports = Tokenizer;