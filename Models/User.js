module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
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
      required: true, 
      }
  });

  return User;
};

// user_id: {
//   type: Sequelize.INTEGER,
//   autoIncreament: true,
//   primaryKey: true
// },



