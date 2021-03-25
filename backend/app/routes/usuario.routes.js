module.exports = app => {
    const usuario = require("../controllers/usuario.controller");
  
    var router = require("express").Router();
  
    router.post("/", usuario.create);
  
    router.get("/", usuario.findAll);
  
    // router.get("/all/professores", usuario.findAllProfessores);

    // router.get("/all/alunos", usuario.findAllAlunos);

    router.get("/:id", usuario.findOne);
  
    router.put("/:id", usuario.update);
  
    router.delete("/:id", usuario.delete);
  
    app.use('/api/usuario', router);
  };