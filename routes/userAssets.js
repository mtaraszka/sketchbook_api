const express = require('express');
const { verifyToken } = require('../middlewares/authJWT');
const { addAssets } = require('../controllers/userAssets.controller');

const router = express.Router();

router.post('/add_assets', verifyToken, addAssets);

module.exports = router;
