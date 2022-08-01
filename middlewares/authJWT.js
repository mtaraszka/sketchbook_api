const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const { headers } = req;
    const { authorization } = headers;

    if(headers && authorization && authorization.split(' ')[0] === 'JWT') {
        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.API_SECRET, (error, decode) => {
            if (error) {
                req.user = undefined;
                res.send(401);
                return;
            }
            User.findOne({
                _id: decode.id
            }).exec((error, user) => {
                if (error) {
                    res.status(500)
                        .send({ message: error })
                } else {
                    req.user = user;
                    req.token = `JWT ${token}`;
                    next();
                }
            })
        })
    } else {
        req.user = undefined;
        next();
    }
}
