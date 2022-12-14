const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const UserAssets = require('../models/userAssets');

exports.deleteAccount = async (req, res) => {
  const { user } = req;

  User.deleteOne({
    id: user._id
  }).then(() => {
    res.status(200).send('User Deleted');
  }).catch(() => {
    res.status(409).send('Unable to delete user');
  });
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  const assets = new UserAssets({
    userID: user._id
  });

  user.save((error) => {
    if (error) {
      res.status(500).send({ message: error });
    } else {
      assets.save((error) => {
        if (error) {
          res.status(500).send({ message: error });
        } else {
          res.status(200).send({ message: 'User and his default assets registered.' });
        }
      });
    }
  });
};

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
      });
    return;
  }

  const { email, password } = req.body;

  User.findOne({
    email
  }).exec((error, user) => {
    if (error) {
      return res.status(500).send({ message: error });
    }

    if (!user) {
      res.status(404).send({ message: 'User not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      password, user.password
    );

    if (!passwordIsValid) {
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
        message: 'Login successfull',
        token: token,
      });
  });
};