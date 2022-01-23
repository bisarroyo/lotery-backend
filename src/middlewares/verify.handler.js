const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const boom = require('@hapi/boom');

const config = require('../config/config');

const checkDuplicateEmail = async (req, res, next) => {
  const {email} = req.body;
  try {
    const foundEmail = await User.findOne({email: email})
    if (foundEmail) {
      throw boom.unauthorized('This email is already used');
    }
    next();
  }catch (err) {
    console.error(err)
  };
};

const checkRole = async (req, res, next) => {
  const {roles} = req.body;
  try {
    if(roles) {
      const findRole = await Role.findOne({name: roles});
      if (!findRole) {
        throw boom.badRequest('Role not found')
      }
    };
    next();
  }catch (err) {
    console.error(err);
  }
};

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return next(boom.unauthorized('token no provided'));
  }
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await User.findById(decoded.id, {password: 0});
    if (!user) {
      return next(boom.unauthorized('user not found'))
    }
    req.user = user;
    next();
  }catch (err) {
    console.error(err);
  };
};

const isAdmin = async (req, res, next) => {
  try{
    const user = await User.findById(req.user._id);
    const role = await Role.find({_id: {$in: user.roles}});
    if(role[0].name === 'admin'){
      next();
      return;
    }
    return next(boom.unauthorized('you have not permision for visit this page.'));
  }catch(err){
    console.error(err);
  }
};

const isUser = async (req, res, next) => {
  try{
    const user = await User.findById(req.user._id);
    const role = await Role.find({_id: {$in: user.roles}});
    if(role[0].name === 'user'){
      next();
      return;
    }
    return next(boom.unauthorized('You need to sing in'));
  }catch(err){
    console.error(err);
  }
};

module.exports = {checkDuplicateEmail, checkRole, verifyToken, isAdmin, isUser};