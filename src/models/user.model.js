const { Schema, model } =require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  birth_date: {
    type: Date,
    min: '1950-01-01',
    max: '2010-12-12',
    require: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'role'
    }
  ]
},{
  timestamps: true,
  versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

module.exports = model('User', userSchema);