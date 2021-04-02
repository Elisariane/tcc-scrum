module.exports = (sequelize, Sequelize) => {
    const itensTccSprint = sequelize.define("itensTccSprint", {
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
  
    return itensTccSprint;
  };