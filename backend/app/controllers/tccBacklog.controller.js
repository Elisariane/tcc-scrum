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
    dataCadastro: req.body.dataCadastro,
    id_usuario: req.body.id_usuario
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

// exports.findAllByUsuario = (req, res) => {
//   const id_usuario = req.query.id_usuario;

//   TccBacklog.findAll({  include: { all: true }})
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Ocorreu algum erro ao buscar o TccBacklog."
//       });
//     });
// };

exports.findOne = (req, res) => {
  const id = req.params.id;

  TccBacklog.findOne({where : { id: id }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao buscar o TccBacklog com id=" + id
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
  const id = req.params.id;
  TccBacklog.findAll({ where: { prioridade: 'alta', id_usuario: id} })
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
  const id = req.params.id;
  TccBacklog.findAll({ where: { prioridade: 'media', id_usuario: id } })
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
  const id = req.params.id;
  TccBacklog.findAll({ where: { prioridade: 'baixa', id_usuario: id } })
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
  const id = req.params.id;
  TccBacklog.findAll({ where: { status: 'pendente', id_usuario: id } })
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
  const id = req.params.id;
  TccBacklog.findAll({ where: { status: 'fazendo', id_usuario: id } })
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
  const id = req.params.id;
  TccBacklog.findAll({ where: { status: 'finalizado', id_usuario: id } })
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