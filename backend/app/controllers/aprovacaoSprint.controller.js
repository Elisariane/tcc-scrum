module.exports = (sequelize, Sequelize) => {
    const AprovacaoSprint = sequelize.define("aprovacaoSprint", {
      id: {
        type: Sequelize.INTEGER
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