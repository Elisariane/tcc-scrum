const db = require("../models");
const Sprint = db.sprint;
const AprovacaoSprint = db.aprovacaoSprint;
const Op = require("sequelize");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  // Create a Sprint
  const sprint = {
    objetivo: req.body.objetivo,
    dataInicio: req.body.dataInicio,
    dataFim: req.body.dataFim,
    id_aprovacao_sprint: req.body.id_aprovacao_sprint
  };

  // Save Sprint in the database
  Sprint.create(sprint)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao salvar o Sprint."
      });
    });
    
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.substring]: `%${nome}%` } } : null;

  Sprint.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao buscar o Sprint."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Sprint.findOne({where : { id: id }},
    {
      include : [ { 
          model : AprovacaoSprint, 
          as : 'AprovacaoSprint' 
        }] 
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao buscar o Sprint com id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Sprint.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sprint foi edidado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível atualizar o Sprint com id = ${id}. Talvez Sprint não tenha sido encontrado ou req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar Sprint com id =" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Sprint.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sprint foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível deletar Sprint com id = ${id}. Talvez o Sprint não tenha sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível deletar Sprint com id = " + id
      });
    });
};
