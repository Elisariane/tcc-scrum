module.exports = (sequelize, Sequelize) => {
    const AprovacaoSprint = sequelize.define("aprovacaoSprint", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      aprovado: {
        type: Sequelize.BOOLEAN
      },
      observacao: {
        type: Sequelize.STRING
      },
      dataAprovacao: {
        type: Sequelize.DATE
      }
    });
  
    return AprovacaoSprint;
  };