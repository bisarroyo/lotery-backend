const express = require('express');
const MatchController = require('../controllers/match.controller');
// const validatorHandler = require('../middlewares/validator.handler');
// const { singIn, singUp } = require('../schemas/auth.schema');
const {verifyToken, isUser} = require('../middlewares/verify.handler');

const router = express.Router();
const controller = new MatchController();

router.post('/', controller.createMatch);
router.get('/', controller.getAllMatches);
router.get('/:id', controller.getMatchById);
router.put('/:id', controller.updateMatch);
router.delete('/:id', controller.deleteMatch);


module.exports = router;