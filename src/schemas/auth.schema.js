const { body } = require('express-validator')

const signIn = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 1 }).withMessage('Password is too short')
]

const signUp = [
  body('name').isLength({ min: 3 }).withMessage('Name is too short'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 5 }).withMessage('Password is too short'),
  body('roles').isLength({ min: 1 }).withMessage('Role is required')
]

module.exports = { signIn, signUp }
