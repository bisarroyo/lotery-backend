const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
}, {
  versionKey: false
})

const role = model('Role', roleSchema);

module.exports = role;