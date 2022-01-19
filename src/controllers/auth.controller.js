const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



class authController {
  constructor(){
    this.user = [];

  }

  async singUp(user) {
    try{
      const { name, email, password, roles } = user;
      
    }catch(err){
      console.error(err);
    }
  }

  async singIn() {

  }

}

module.exports = authController;