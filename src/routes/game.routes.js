const express = require('express');
const GameController = require('../controllers/game.controller');
// const validatorHandler = require('../middlewares/validator.handler');
// const { singIn, singUp } = require('../schemas/auth.schema');
const {verifyToken, isUser} = require('../middlewares/verify.handler');

const router = express.Router();
const controller = new GameController();

router.post('/', controller.createGame);
router.get('/', controller.getAllGames);
router.get('/:id', controller.getGameById);
router.put('/:id', controller.updateGame);
router.delete('/:id', controller.deleteGame);


module.exports = router;