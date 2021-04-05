const db = require("../models");
const ItensTccSprint = db.itensTccSprint;
const Sprint = db.sprint;
const TccBacklog = db.tccBacklog;
const Op = require("sequelize");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  // Create a ItensTccSprint
  const itensTccSprint = {
    concluido: req.body.concluido,
    id_sprint: req.body.id_sprint,
    id_item_tcc_backlog: req.body.id_item_tcc_backlog
  };

  // Save ItensTccSprint in the database
  ItensTccSprint.create(itensTccSprint)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao salvar o ItensTccSprint."
      });
    });
    
};

exports.findAll = (req, res) => {
  ItensTccSprint.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao buscar o ItensTccSprint."
      });
    });
};

exports.findAllByUsuario = (req, res) => {
  const id = req.params.id;

ItensTccSprint.findAll({  where : { concluido: false, id_sprint: id}, include: 
  {  model: db.tccBacklog, all: true, nested:true }})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocorreu algum erro ao buscar o TccBacklog."
    });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ItensTccSprint.findOne({where : { id: id }},
    {
      include : [ { 
          model : Sprint, 
          as : 'Sprint' 
        },
        {
          model : TccBacklog, 
          as : 'TccBacklog' 
        },
      ] 
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao buscar o ItensTccSprint com id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ItensTccSprint.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ItensTccSprint foi edidado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível atualizar o ItensTccSprint com id = ${id}. Talvez ItensTccSprint não tenha sido encontrado ou req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar ItensTccSprint com id =" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ItensTccSprint.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ItensTccSprint foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível deletar ItensTccSprint com id = ${id}. Talvez o ItensTccSprint não tenha sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível deletar ItensTccSprint com id = " + id
      });
    });
};
