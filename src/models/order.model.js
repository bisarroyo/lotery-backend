const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Cancelled'],
  },
  match_id: {
    type: Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  numbers_played: [
    {
    type: Number,
    required: true,
    }
  ],
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('Order', orderSchema);