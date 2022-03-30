const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Role = require('../models/role.model');

const config = require('../config/config');

const checkDuplicateEmail = async (req, res, next) => {
  const {email} = req.body;
  try {
    const foundEmail = await User.findOne({email: email})
    if (foundEmail) {
      res.status(200).json({message: 'Email already exists'});
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
        res.status(400).json({message: 'Role not found'});
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
    res.status(401).json({message: 'No token provided'});
  }
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await User.findById(decoded.id, {password: 0});
    if (!user) {
      res.status(404).json({message: 'User not found'});
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
    res.status(401).json({message: 'You need to be admin'});
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
    res.status(401).json({message: 'You need to be user'});
  }catch(err){
    console.error(err);
  }
};

module.exports = {checkDuplicateEmail, checkRole, verifyToken, isAdmin, isUser};