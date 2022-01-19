const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();
const email = Joi.string();
const password = Joi.string();
const roles = Joi.string();


const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  roles
})

const updateUserSchema = Joi.object({
  name,
  email,
  password,
  roles
})

const deleteUserSchema = Joi.object({
  id: id.required()
})

module.exports = { createUserSchema, updateUserSchema, deleteUserSchema};