const express = require('express');
const authController = require('../controllers/auth.controller');
const validatorHandler = require('../middlewares/validator.handler');
const { singIn, singUp } = require('../schemas/auth.schema');
const {checkDuplicateEmail, checkRole} = require('../middlewares/verify.handler');

const router = express.Router();
const controller = new authController();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
})

router.post('/singup',
  validatorHandler(singUp, 'body'),
  checkDuplicateEmail,
  checkRole,
  controller.singUp
);

router.post('/singin',
  validatorHandler(singIn, 'body'),
  controller.singIn
);

router.get('/singout', 
  controller.singOut
);

router.post('/recovery',
  controller.sendRecoveryMail
);

router.post('/reset',
  controller.resetPassword
);

module.exports = router;