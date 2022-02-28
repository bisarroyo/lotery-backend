const Match = require('../models/match.model');
const Game = require('../models/game.model');
const Boom = require('@hapi/boom');
const resultOne = require('../libs/resultOne');

class MatchController {
  async getAllMatches(req, res, next) {
    try {
      const matches = await Match.find();
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async getMatchById(req, res, next) {
    try {
      const match = await Match.findById(req.params.id);
      return res.status(200).json(match);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async createMatch(req, res, next) {
    try {
      const gameResult = resultOne();
      const { body } = req;
      body.status = 'pending';
      body.result = [gameResult];
      body.game_id = await Game.findOne({ name: body.game_id });
      const match = await Match.create(body);
      return res.status(201).json(match);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async updateMatch(req, res, next) {
    try {
      const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json(match);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async deleteMatch(req, res, next) {
    try {
      const match = await Match.findByIdAndDelete(req.params.id);
      return res.status(200).json(match);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }
}

module.exports = MatchController;