const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const { headers } = req;
    const { authorization } = headers;

    if(headers && authorization && authorization.split(' ')[0] === 'JWT') {
        jwt.verify(authorization.split(' ')[1], process.env.API_SECRET, (error, decode) => {
            if (error) req.user = undefined;
            User.findOne({
                _id: decode.id
            }).exec((error, user) => {
                if (error) {
                    res.status(500)
                        .send({ message: error })
                } else {
                    req.user = user;
                    next();
                }
            })
        })
    } else {
        req.user = undefined;
        next();
    }
}
