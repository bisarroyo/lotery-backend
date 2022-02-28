const { Schema, model } = require('mongoose');

const matchSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  result: [
    {
      type: Number,
      required: true,
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'finished'],
    required: true,
  },
  game_id: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('Match', matchSchema);