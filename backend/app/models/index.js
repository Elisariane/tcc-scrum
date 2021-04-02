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
db.itensTccSprint = require("./itensTccSprint.model")(sequelize, Sequelize);
db.sprint = require("./sprint.model")(sequelize, Sequelize);
db.tccBacklog = require("./tccBacklog.model")(sequelize, Sequelize);

//Associação Um para muitos Usuario-TccBacklog
db.usuario.hasMany(db.tccBacklog, {
  foreignKey: {
    name: 'id_usuario',
    allowNull : false 
  }
});
db.tccBacklog.belongsTo(db.usuario);

//Associação Um para muitos Usuario-AprovacaoSprint
db.usuario.hasMany(db.aprovacaoSprint, {
  foreignKey: {
    name: 'id_usuario',
    allowNull : false 
  }
});
db.aprovacaoSprint.belongsTo(db.usuario);

//Associação Um para muitos AprovacaoSprint-Sprint
db.aprovacaoSprint.hasMany(db.sprint, {
  foreignKey: {
    name: 'id_aprovacao_sprint',
    allowNull : true 
}
});
db.sprint.belongsTo(db.aprovacaoSprint);

//Associação Um para muitos Sprint-itensTccSprint
db.sprint.hasMany(db.itensTccSprint, {
  foreignKey: {
    name: 'id_sprint',
    allowNull : true 
  }
});
db.itensTccSprint.belongsTo(db.sprint);

//Associação Um para muitos TccBacklog-itensTccSprint
db.tccBacklog.hasMany(db.itensTccSprint, {
  foreignKey: {
    name: 'id_item_tcc_backlog',
    allowNull : false 
  }
});
db.itensTccSprint.belongsTo(db.sprint);

module.exports = db;