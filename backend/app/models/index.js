const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.sequelize = sequelize;

db.usuario = require("./usuario.model")(sequelize, Sequelize);
db.aprovacaoSprint = require("./aprovacaoSprint.model")(sequelize, Sequelize);
db.itensTccBacklog = require("./itensTccBacklog.model")(sequelize, Sequelize);
db.sprint = require("./sprint.model")(sequelize, Sequelize);
db.tccBacklog = require("./tccBacklog.model")(sequelize, Sequelize);

module.exports = db;