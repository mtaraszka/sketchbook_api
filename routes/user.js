const express = require('express');
const router = express.Router();
const { signup, signin, deleteAccount } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/authJWT');

router.post('/register', signup);

router.post('/login', verifyToken, signin);

router.delete('/delete_account', verifyToken, deleteAccount);

router.get('/hiddencontent', verifyToken, (req, res) => {
  if (!req.user) {
    res.status(401)
      .send({
        message: "Invalid JWT token"
      });
  } else {
    res.status(200)
      .send({
        message: "Congratulations! but there is no hidden content"
      });
  }
})

module.exports = router;
