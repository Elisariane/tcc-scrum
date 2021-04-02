const db = require("../models");
const AprovacaoSprint = db.AprovacaoSprint;
const Usuario = db.usuario;
const Op = require("sequelize");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.requisito) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  // Create a AprovacaoSprint
  const AprovacaoSprint = {
    aprovado: req.body.aprovado,
    observacao: req.body.observacao,
    dataAprovacao: req.body.dataAprovacao,
    id_usuario: req.body.id_usuario,
  };

  // Save AprovacaoSprint in the database
  AprovacaoSprint.create(AprovacaoSprint)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao salvar o AprovacaoSprint."
      });
    });
    
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.substring]: `%${nome}%` } } : null;

  AprovacaoSprint.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao buscar o AprovacaoSprint."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  AprovacaoSprint.findOne({where : { id: id }},
    {
      include : [ { 
          model : Usuario, 
          as : 'Usuario' 
        }
      ] 
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao buscar o AprovacaoSprint com id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  AprovacaoSprint.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AprovacaoSprint foi edidado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível atualizar o AprovacaoSprint com id = ${id}. Talvez AprovacaoSprint não tenha sido encontrado ou req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar AprovacaoSprint com id =" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  AprovacaoSprint.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AprovacaoSprint foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível deletar AprovacaoSprint com id = ${id}. Talvez o AprovacaoSprint não tenha sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível deletar AprovacaoSprint com id = " + id
      });
    });
};
