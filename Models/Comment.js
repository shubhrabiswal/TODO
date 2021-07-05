module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
  comments: {
    type: Sequelize.STRING,
    required: true,
  },
  posted_by: {
    type: Sequelize.INTEGER,
  },
  todo_id:{
    type: Sequelize.INTEGER,
  }

},{timestamps: true})

return Comment;
} 

// comments: { 
  //   type: Sequelize.STRING, 
  //   get: function() {
  //       return JSON.parse(this.getDataValue('comments'));
  //   }, 
  //   set: function(val) {
  //       return this.setDataValue('comments', JSON.stringify(val));
  //   }
  // },
