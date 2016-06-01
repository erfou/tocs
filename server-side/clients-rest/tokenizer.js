var Tokenizer = {
    tokenize : function (clientInfos, callback) {
        callback(null, new Buffer(JSON.stringify(clientInfos)).toString('base64'));
        //console.log(new Buffer("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
    },
    detokenize : function (token, callback) {
        callback(null, JSON.parse(new Buffer(token, 'base64').toString('ascii')));
        //console.log(new Buffer("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
    }
};

module.exports = Tokenizer;