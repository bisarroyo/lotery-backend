const Role = require('../models/role.model');

const createRole = async () => {
  try{
    const roles = await Role.estimatedDocumentCount();
    if(roles > 0) return;
    const values = Promise.all([
      new Role({name: 'user'}).save(),
      new Role({name: 'admin'}).save()
    ])
    console.log(values);
  }catch(err){
    console.error(err);
  }
};

module.exports = createRole;