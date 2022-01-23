const express = require('express');
const paymentController = require('../controllers/auth.controller');
const {createOrder, captureOrder, cancelOrder} = require('../controllers/payment.controller');
// const validatorHandler = require('../middlewares/validator.handler');
// const { singIn, singUp } = require('../schemas/auth.schema');
const {verifyToken, isUser} = require('../middlewares/verify.handler');

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/capture-order', captureOrder);
router.get('/cancel-order', cancelOrder);


module.exports = router;