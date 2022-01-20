const User = require('../models/user.model');
const Role = require('../models/role.model');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const {jwt} = require('../config/config');

class authController {
  constructor(){
  }

  async singUp(user) {
    try{
      const { name, email, password, roles } = user;
      const newUser = await new User(
        {
          name,
          email,
          password: await User.encryptPassword(password),
        }
      );
      //checking for roles
      if(roles) {
        const foundRole = await Role.find({name: {$in: roles}});
        newUser.roles = foundRole.map((role) => role._id);
      }else {
        const role = await Role.find({name: 'user'});
        newUser.roles = [role._id]
      };

      //save the user object
      const savedUser = newUser.save();

      //create the jwt token
      const token = jwt.sign({id: savedUser._id}, jwt.secret, {
        expiresIn: 86400 //24 hours
      })
      return token;
    }catch(err){
      console.error(err);
    }
  }

  async singIn(user) {
    const { email, password } = user;
    try {
      const foundUser = await User.find({email: email});
      if(!foundUser) {
        throw boom.unauthorized('this email is not registered')
      }
      const matchPassword = await User.comparePassword(password, foundUser.password);
      if(!matchPassword) {
        throw boom.unauthorized('this password is not')
      };
      const token = jwt.sign({id: foundUser._id}, jwt.secret, {
        expiresIn: 86400 //24 hours
      })
      return token;
    }catch(err){
      console.error(err)
    };
  };
}

module.exports = authController;