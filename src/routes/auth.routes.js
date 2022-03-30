const express = require('express');
const authController = require('../controllers/auth.controller');
const validatorHandler = require('../middlewares/validator.handler');
const { signIn, signUp } = require('../schemas/auth.schema');
const {checkDuplicateEmail, checkRole} = require('../middlewares/verify.handler');

const router = express.Router();
const controller = new authController();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
})

router.post('/signup',
  signUp, //validate the fields and throw error if invalid
  validatorHandler(),//show error if invalid signUp
  checkDuplicateEmail,
  checkRole,
  controller.signUp
);

router.post('/signin',
  signIn, //validate the fields and throw error if invalid
  validatorHandler(),//show error if invalid signIn
  controller.signIn
);

router.get('/signout', 
  controller.signOut
);

router.post('/recovery',
  controller.sendRecoveryMail
);

router.post('/reset',
  controller.resetPassword
);

module.exports = router;