const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
    enum: ['paypal'],
  },
  payment_date: {
    type: Date,
    required: true,
  },
  payment_amount: {
    type: Number,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
    enum: ['Paid', 'Unpaid'],
  },
  payment_description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('Payment', paymentSchema);