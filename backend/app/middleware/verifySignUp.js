// middleware/users.js
const jwt = require("jsonwebtoken");
module.exports = {
  validateRegister: (req, res, next) => {
    // nome min length 3
    if (!req.body.nome || req.body.nome.length < 3) {
      return res.status(400).send({
        msg: 'Por favor, insira um nome de usuário com no min. 3 caracteres'
      });
    }
    // senha min 6 chars
    if (!req.body.senha || req.body.senha.length < 6) {
      return res.status(400).send({
        msg: 'Por favor, insira uma senha com no min. 6 caracteres'
      });
    }
    // senha (repeat) does not match
    // if (
    //   !req.body.senha_repeat ||
    //   req.body.senha != req.body.senha_repeat
    // ) {
    //   return res.status(400).send({
    //     msg: 'Ambas as senhas devem corresponder'
    //   });
    // }
    next();
  }
};