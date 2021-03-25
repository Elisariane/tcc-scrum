module.exports = (sequelize, Sequelize) => {
    const Sprint = sequelize.define("sprint", {
      id: {
        type: Sequelize.INTEGER
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