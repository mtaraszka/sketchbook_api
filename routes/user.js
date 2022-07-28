const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/authJWT');

router.post('/register', signup)

router.post('/login', signin);

router.get('/hiddencontent', verifyToken, (req, res) => {
  if (!req.user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  if (req.user == "admin") {
    res.status(200)
      .send({
        message: "Congratulations! but there is no hidden content"
      });
  } else {
    res.status(403)
      .send({
        message: "Unauthorised access"
      });
  }
})

module.exports = router;
