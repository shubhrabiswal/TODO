module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
     name: {
        type: Sequelize.STRING,
        required: true, 
      },
      email: {
        type: Sequelize.STRING,
        required: true, 
      },
      password: {
        type: Sequelize.STRING,
        required: true, 
      },
      date:{
        type: Sequelize.STRING,
        // required: true, 
        }
    });
  
    return Admin;
  };