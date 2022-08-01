const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    const user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 8),
    });

    user.save((error) => {
        if(error) {
            res.status(500).send({ message: error });
        } else {
            res.status(200).send({ message: "User registered." });
        }
    })
}

exports.signin = (req, res) => {
    const { user, token } = req;

    if (user) {
        res.status(200)
          .send({
              user: {
                  id: user._id,
                  email: user.email,
                  name: user.name
              },
              token: token,
          })
      return;
    }

    const { email, password } = req.body;

    User.findOne({
        email
    }).exec((error, user) => {
        if(error) {
            return res.status(500).send({ message: error });
        }

        if(!user) {
            res.status(404).send({ message: 'User not found.' })
        }

        const passwordIsValid = bcrypt.compareSync(
            password, user.password
        )

        if(!passwordIsValid) {
            return res.status(401)
                .send({
                    accessToken: null,
                    message: 'Invalid password.'
                });
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });

        res.status(200)
            .send({
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                },
                message: "Login successfull",
                token: token,
            })
    })
}