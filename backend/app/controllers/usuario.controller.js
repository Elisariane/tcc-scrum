const db = require("../models");
const Usuario = db.usuario;
const Op = require("sequelize");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  // Create a Usuario
  const usuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    tipoUsuario: req.body.tipoUsuario
  };

  // Save Usuario in the database
  Usuario.create(usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao salvar o Usuario."
      });
    });
    
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.substring]: `%${nome}%` } } : null;

  Usuario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao buscar o Usuario."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao buscar usuario com id= " + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Usuario.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuario foi edidado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível atualizar o Usuario com id = ${id}. Talvez Usuario não tenha sido encontrado ou req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar Usuario com id =" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Usuario.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuario foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível deletar Usuario com id = ${id}. Talvez o Usuario não tenha sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível deletar Usuario com id = " + id
      });
    });
};

// exports.findAllProfessores = (req, res) => {
//   Usuario.findAll({ where: { tipoUsuario: 'professor' } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Ocorreu algum erro ao recuperar os usuarios."
//       });
//     });
// };

// exports.findAllAlunos = (req, res) => {
//   Usuario.findAll({ where: { tipoUsuario: 'aluno' } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Ocorreu algum erro ao recuperar os usuarios."
//       });
//     });
// };