const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive'],
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('Game', gameSchema);