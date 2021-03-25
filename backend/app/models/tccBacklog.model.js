module.exports = (sequelize, Sequelize) => {
    const TccBacklog = sequelize.define("tccBacklog", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      requisito: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM({
          values: ['pendente', 'fazendo', 'finalizado']
        })
      },
      prioridade: {
        type: Sequelize.ENUM({
            values: ['alta', 'media', 'baixa']
          })
      },
      estimativa: {
          type: Sequelize.TIME
      },
      dataCadastro: {
        type: Sequelize.DATE
      }
      
    });
  
    return TccBacklog;
  };