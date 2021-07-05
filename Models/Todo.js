module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    title: {
      type: Sequelize.STRING,
      required: true, 
    },
    status: {
      type: Sequelize.BOOLEAN,
      required: true, 
    },
    category:{
      type: Sequelize.STRING,
      // enum :["task","hobby","work"],
      default: "task"
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });

  return Todo;
};
