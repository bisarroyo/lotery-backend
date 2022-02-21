const express = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const paymentRouter = require('./payment.routes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/user', userRouter); 
  router.use('/payment', paymentRouter);
};

module.exports = routerApi;