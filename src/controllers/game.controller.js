const Game = require('../models/game.model');
const Boom = require('@hapi/boom');

class GameController {
  async getAllGames(req, res, next) {
    try {
      const games = await Game.find();
      return res.status(200).json(games);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async getGameById(req, res, next) {
    try {
      const game = await Game.findById(req.params.id);
      return res.status(200).json(game);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async createGame(req, res, next) {
    try {
      const game = await Game.create(req.body);
      return res.status(201).json(game);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async updateGame(req, res, next) {
    try {
      const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json(game);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async deleteGame(req, res, next) {
    try {
      const game = await Game.findByIdAndDelete(req.params.id);
      return res.status(200).json(game);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }
}

module.exports = GameController;