const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.todo = require("./Todo")(sequelize, Sequelize);
db.activeuser = require("./ActiveUser")(sequelize, Sequelize);
db.comment = require("./Comment")(sequelize, Sequelize);
db.tag = require("./Tag")(sequelize, Sequelize);
db.view = require("./View")(sequelize, Sequelize);
db.like = require("./Like")(sequelize, Sequelize);
db.rating = require("./Rating")(sequelize, Sequelize);
db.admin = require("./Admin")(sequelize, Sequelize);


// db.user.belongsToMany(db.todo, { through: 'users_todos'});
// db.todo.belongsToMany(db.user, { through: 'users_todos'});

db.todo.belongsTo(db.user);
db.user.hasMany(db.todo);

module.exports = db;