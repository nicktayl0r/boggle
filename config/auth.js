var User = require('../models/user');
var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
    var token = req.get('Authorization') || req.query.token || req.get('Authorization');
    if (token) {
        token = token.replace('Bearer ', '');
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                next(err);
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } else {
        next();
    } 
};