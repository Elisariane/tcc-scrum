module.exports = (sequelize, Sequelize) => {
    const ItensTccBacklog = sequelize.define("tccBacklog", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      concluido: {
        type: Sequelize.BOOLEAN
      }
      
    });
  
    return ItensTccBacklog;
  };