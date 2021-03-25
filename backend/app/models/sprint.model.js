module.exports = (sequelize, Sequelize) => {
    const Sprint = sequelize.define("sprint", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      objetivo: {
        type: Sequelize.STRING
      },
      dataInicio: {
        type: Sequelize.DATE
      },
      dataFim: {
        type: Sequelize.DATE
      }
    });
  
    return Sprint;
  };