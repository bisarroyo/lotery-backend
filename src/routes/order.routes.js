const express = require('express');
const OrderController = require('../controllers/order.controller');
// const validatorHandler = require('../middlewares/validator.handler');
// const { singIn, singUp } = require('../schemas/auth.schema');
const {verifyToken, isAdmin} = require('../middlewares/verify.handler');

const router = express.Router();
const controller = new OrderController();

router.post('/',
  verifyToken,
  isAdmin,
  controller.createOrder
);
router.get('/', controller.getAllOrders);
router.get('/:id', controller.getOrderById);
router.put('/:id', controller.updateOrder);
router.delete('/:id', controller.deleteOrder);


module.exports = router;