const { Schema, model } = require('mongoose');

const drawSchema = new Schema({
  draw_date: {
    type: Date,
    required: true,
    unique: true,
  },
  draw_number: {
    type: Number,
    required: true,
    unique: true,
  },
  draw_result: {
    type: Array,
    required: true,
  },
  draw_status: {
    type: String,
    enum: ['pending', 'completed'],
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

drawSchema.statics.numberOfDraws = async function () {
  try {
    const count = await this.countDocuments();
    return count;
  } catch (err) {
    throw boom.badImplementation(err);
  }
};


module.exports = model('Draw', drawSchema);