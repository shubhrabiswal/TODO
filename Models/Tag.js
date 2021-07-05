module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("tag", {
  tag_title: {
    type: Sequelize.STRING,
    required: true,
  },
  
  posted_by: {
    type: Sequelize.INTEGER,
  }

},{timestamps: true})

return Tag;
}
