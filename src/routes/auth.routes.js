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
  async (req, res) => {
    try{
      const user = await controller.singUp(req.body);
      res.json(user)
    } catch (err) {
      console.error(err);
    }
  }
);

router.post('/singin',
  validatorHandler(singIn, 'body'),
  async (req, res) =>{
    try{
      const user = await controller.singIn(req.body);
      res.json(user);
    }catch(err){
      console.error(err);
    }
  }
);


module.exports = router;