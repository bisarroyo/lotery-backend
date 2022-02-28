const express = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const paymentRouter = require('./payment.routes');
const gameRouter = require('./game.routes');
const matchRouter = require('./match.routes');
const orderRouter = require('./order.routes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/user', userRouter); 
  router.use('/payment', paymentRouter);
  router.use('/games', gameRouter)
  router.use('/match', matchRouter)
  router.use('/order', orderRouter)
};

module.exports = routerApi;