module.exports = (sequelize, Sequelize) => {
    const ItensTccBacklog = sequelize.define("tccBacklog", {
      id: {
        type: Sequelize.INTEGER
      },
      concluido: {
        type: Sequelize.BOOLEAN
      }
      
    });
  
    return ItensTccBacklog;
  };