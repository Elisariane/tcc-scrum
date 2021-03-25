const db = require("../models");
const TccBacklog = db.tccBacklog;
const Op = require("sequelize");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.requisito) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  // Create a TccBacklog
  const tccBacklog = {
    requisito: req.body.requisito,
    descricao: req.body.descricao,
    prioridade: req.body.prioridade,
    status: req.body.status,
    estimativa: req.body.estimativa,
    dataCadastro: req.body.dataCadastro
  };

  // Save TccBacklog in the database
  TccBacklog.create(tccBacklog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao salvar o TccBacklog."
      });
    });
    
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.substring]: `%${nome}%` } } : null;

  TccBacklog.findAll({ where: condition })
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

  TccBacklog.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao buscar tccBacklog com id= " + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  TccBacklog.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "TccBacklog foi edidado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível atualizar o TccBacklog com id = ${id}. Talvez TccBacklog não tenha sido encontrado ou req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar TccBacklog com id =" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  TccBacklog.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "TccBacklog foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível deletar TccBacklog com id = ${id}. Talvez o TccBacklog não tenha sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível deletar TccBacklog com id = " + id
      });
    });
};

exports.findAllPrioridadeAlta = (req, res) => {
  TccBacklog.findAll({ where: { prioridade: 'alta' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os tccBacklogs."
      });
    });
};

exports.findAllPrioridadeMedia = (req, res) => {
  TccBacklog.findAll({ where: { prioridade: 'media' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os tccBacklogs."
      });
    });
};

exports.findAllPrioridadeBaixa = (req, res) => {
  TccBacklog.findAll({ where: { prioridade: 'baixa' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os tccBacklogs."
      });
    });
};

exports.findAllStatusPendente= (req, res) => {
  TccBacklog.findAll({ where: { status: 'pendente' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os tccBacklogs."
      });
    });
};

exports.findAllStatusFazendo = (req, res) => {
  TccBacklog.findAll({ where: { prioridade: 'fazendo' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os tccBacklogs."
      });
    });
};

exports.findAllStatusFinalizado = (req, res) => {
  TccBacklog.findAll({ where: { prioridade: 'finalizado' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os tccBacklogs."
      });
    });
};