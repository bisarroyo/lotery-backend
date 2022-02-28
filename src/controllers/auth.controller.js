const User = require('../models/user.model');
const Role = require('../models/role.model');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")

const config = require('../config/config');

class authController {
  constructor(){
  }

  async signUp(req, res) {
    try{
      const { name, email, password, roles } = req.body;
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
        const role = await Role.find({name: "user"});
        newUser.roles = [role[0]._id]
      };

      //save the user object
      const savedUser = newUser.save();

      res.json({message: "User created successfully"});
    }catch(err){
      console.error(err);
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const foundUser = await User.findOne({email: email});
      if(!foundUser) {
        res.json({error: boom.unauthorized("Invalid email").output.payload.message});
      }
      const matchPassword = await User.comparePassword(password, foundUser.password);
      if(!matchPassword) {
        res.json({error: boom.unauthorized("Invalid password").output.payload.message});
      };
      const role = await Role.findById(foundUser.roles)
      const token = jwt.sign({id: foundUser._id}, config.jwt.secret)
      res.cookie('t', token, {httpOnly: true, sameSite: true, expires: new Date(Date.now() + 9999)});
      res.json({token, user: {
        name: foundUser.name,
        email: foundUser.email,
        role: role.name
      }});
    }catch(err){
      console.log(err);
    };
  };

  async signOut(req, res) {
    res.clearCookie('t');
    res.json({message: "You have been logged out"});
  }

  async sendRecoveryMail(req, res) {
    const { email } = req.body;
    try {
      const foundUser = await User.findOne({email: email});
      if(!foundUser) {
        res.json({error: boom.unauthorized("Correo electrónico no válido").output.payload.message});
      }
      const token = jwt.sign({id: foundUser._id}, config.jwt.secret, {expiresIn: '1h'});
      const link = `${config.frontend.url}/recovery?token=${token}`;
      await User.updateOne({_id: foundUser._id}, {resetPasswordToken: token, resetPasswordExpires: Date.now() + 900});
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: config.email_user,
          pass: config.email_password
        }
      });
      const mailOptions = {
        from: config.email_user,
        to: email,
        subject: "Recuperar contraseña",
        text: `Click en el siguiente enlace para recuperar tu contraseña: ${link}`
      };
      await transporter.sendMail(mailOptions);
      res.json({message: "Correo enviado"});
    }catch(err){
      console.log(err);
    };
  };

  async resetPassword(req, res) {
    const { token, password } = req.body;
    try {
      const foundUser = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});
      if(!foundUser) {
        res.json({error: boom.unauthorized("Token inválido").output.payload.message});
      }
      const matchPassword = await User.comparePassword(password, foundUser.password);
      if(matchPassword) {
        res.json({error: boom.unauthorized("La contraseña no puede ser la misma que la anterior").output.payload.message});
      };
      const newPassword = await User.encryptPassword(password);
      await User.updateOne({_id: foundUser._id}, {password: newPassword, resetPasswordToken: undefined, resetPasswordExpires: undefined});
      res.json({message: "Contraseña cambiada"});
    }catch(err){
      console.log(err);
    };
  }
};

module.exports = authController
